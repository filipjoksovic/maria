import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {
  BehaviorSubject,
  filter,
  find,
  map,
  merge,
  Observable,
  of,
  Subject,
  Subscriber,
  switchMap,
  tap,
  zip
} from 'rxjs';
import {QueryParametersModel, RequestModel} from '../model/request.model';
import {RequestTypeEnum} from '../model/request-type.enum';
import {DataService} from './data.service';
import {HttpClient, HttpHeaders, HttpParams, HttpParamsOptions} from "@angular/common/http";
import {RequestResultService} from "./request-result.service";
import {QueryParameterRow} from "../../components/request-query-parameters/request-query-parameters.component";
import {
  isValidParameter,
  isValidQueryParameter,
  mapToHeaders,
  mapToQueryParameters,
  trimParameters
} from "../utils/params.utils";
import {RequestHeaderRow} from "../../components/request-headers/request-headers.component";

@Injectable({
  providedIn: 'root'
})
export class RequestService {


  private readonly _requests$: BehaviorSubject<RequestModel[]>;
  public readonly requests$: Observable<RequestModel[]>;

  private readonly _requestAdded$: Subject<RequestModel> = new Subject<RequestModel>();
  private readonly _requestDeleted$: Subject<string> = new Subject<string>();

  private readonly _activeRequest$: Subject<RequestModel> = new Subject();
  public readonly activeRequest$ = this._activeRequest$.asObservable();

  private readonly _requestSelected$: Subject<string> = new Subject();

  private readonly _requestUpdated$: Subject<{ id: string } & Partial<RequestModel>> = new Subject();

  constructor(private readonly router: Router, private readonly dataService: DataService, private readonly http: HttpClient, private readonly requestResultService: RequestResultService) {
    this._requests$ = new BehaviorSubject<RequestModel[]>(this.fetchRequestsFromDataStore());
    this.requests$ = this._requests$.asObservable();

    this._requestAdded$.subscribe((requestToAdd) => {
      const currentData = this._requests$.value;
      const newData = [...currentData, requestToAdd];
      this._requests$.next(newData);
      this.dataService.store("requests", newData);
    })

    this._requestDeleted$.subscribe((requestUuid) => {
      const currentData = this._requests$.value;
      const newData = currentData.filter(request => request.id !== requestUuid);

      this._requests$.next(newData);
      this.dataService.store("requests", newData);
    })

    this._requestSelected$.pipe(
      switchMap(requestId => {
        return this.requests$.pipe(map(requests => requests.find(request => request.id === requestId)))
      }),
      filter(request => request !== null && request !== undefined),
      tap(request => this._activeRequest$.next(request))).subscribe();

    this._requestUpdated$.pipe(
      switchMap((updateData) => {
        return zip(of(updateData), this.requests$.pipe(map(requests => requests.find(request => request.id === updateData.id))))
      }),
      filter(([updateData, request]) => request !== null && request !== undefined),
      tap(([updateData, foundRequest]) => {
        const updatedRequest: RequestModel = {
          ...foundRequest,
          ...updateData
        } as RequestModel;

        const currentData = this._requests$.value;
        const newData = currentData.filter(request => request.id !== updateData.id);

        newData.push(updatedRequest);

        this._requests$.next(newData);
        console.log(newData);
        this.dataService.store("requests", newData);
      })
    ).subscribe();

  }


  private fetchRequestsFromDataStore(): RequestModel[] {
    console.log(this.dataService);
    const requests: object[] = this.dataService.getArray("requests");
    return requests as RequestModel[];
  }

  private createNewRequest() {
    const request: RequestModel = {
      id: crypto.randomUUID(),
      name: "New Request",
      url: '',
      method: RequestTypeEnum.GET,
      params: [],
      headers: []
    }
    this._requestAdded$.next(request);

  }

  handleNewRequest() {
    this.createNewRequest();
    this.router.navigate(['/new'])
  }

  handleRequestDelete(requestUuid: string) {
    console.log("Deleting request", requestUuid);

    this._requestDeleted$.next(requestUuid);
  }

  setActiveRequest(id: string | null) {
    if (id == null) {
      throw new Error("id not found");
    }

    this._requestSelected$.next(id);
  }

  updateRequest(request: RequestModel, updateData: Partial<RequestModel>) {
    if (request === null) {
      return;
    }

    console.log("Request", request);
    console.log("Update", updateData);
    console.log("Updating request");
    this._requestUpdated$.next({
      ...request,
      ...updateData
    })

  }

  executeRequest(requestModel: RequestModel) {
    console.log("Received request to execute", requestModel)
    switch (requestModel.method) {
      case RequestTypeEnum.GET:
        console.log("Executing GET request");
        this.handleGet(requestModel);
        break;
      case RequestTypeEnum.POST:
        console.log("Executing POST request");
        this.handlePost(requestModel);
        break;
      case RequestTypeEnum.PUT:
        console.log("Executing PUT request");
        this.handlePut(requestModel);
        break;
      case RequestTypeEnum.DELETE:
        console.log("Executing DELETE request");
        this.handleDelete(requestModel);
        break;
      default:
        console.log("Unknown request type");
        break;

    }
  }

  private handleDelete(requestModel: RequestModel) {
    const options = {
      params: this.createHttpParams(requestModel),
      headers: this.createHeaders(requestModel)
    }
    console.log("Options", options);
    this.http.delete(requestModel.url, options).subscribe((response: any) => {
      console.log(response);
      this.requestResultService.onResultReceived(requestModel, response);
    });
  }

  private handlePut(requestModel: RequestModel) {
    const options = {
      params: this.createHttpParams(requestModel),
      headers: this.createHeaders(requestModel)
    }
    console.log("Options", options);
    this.http.put(requestModel.url, options).subscribe((response: any) => {
      console.log(response);
      this.requestResultService.onResultReceived(requestModel, response);
    });
  }

  private handleGet(requestModel: RequestModel) {
    const options = {
      params: this.createHttpParams(requestModel),
      headers: this.createHeaders(requestModel)
    }
    console.log("Options", options);
    this.http.get(requestModel.url, options).subscribe((response: any) => {
      console.log(response);
      this.requestResultService.onResultReceived(requestModel, response);
    });
  }

  private createHttpParams(requestModel: RequestModel): HttpParams {
    let httpParams = new HttpParams();
    requestModel.params.map(trimParameters).filter(isValidQueryParameter).forEach((param) => {
      httpParams = httpParams.append(param.name, param.value);
    });

    return httpParams;

  }

  private createHeaders(requestModel: RequestModel): HttpHeaders {
    let headers = new HttpHeaders();
    requestModel.headers.map(trimParameters).filter(isValidQueryParameter).forEach((param) => {
      headers = headers.set(param.name, param.value);
    });
    return headers;
  }


  private handlePost(requestModel: RequestModel) {
    const options = {
      params: this.createHttpParams(requestModel),
      headers: this.createHeaders(requestModel)
    }
    console.log("Options", options);
    this.http.post(requestModel.url, options).subscribe((response: any) => {
      console.log(response);
      this.requestResultService.onResultReceived(requestModel, response);
    });
  }

  changeQueryParameters(requestModel: RequestModel, $event: QueryParameterRow[]) {
    this._requestUpdated$.next({
      id: requestModel.id,
      params: mapToQueryParameters($event)
    });
  }


  changeHeaders(requestModel: RequestModel, $event: RequestHeaderRow[]) {
    this._requestUpdated$.next({
      id: requestModel.id,
      headers: mapToHeaders($event)
    });
  }
}


