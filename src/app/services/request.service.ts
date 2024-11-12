import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, filter, map, Observable, of, Subject, switchMap, tap, zip} from 'rxjs';
import {RequestModel} from '../model/request.model';
import {RequestTypeEnum} from '../model/request-type.enum';
import {DataService} from './data.service';
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {RequestResultService} from "./request-result.service";
import {QueryParameterRow} from "../../components/request-query-parameters/request-query-parameters.component";
import {isValidQueryParameter, mapToHeaderParameter, mapToQueryParameter, trimParameters} from "../utils/params.utils";
import {RequestHeaderRow} from "../../components/request-headers/request-headers.component";
import {RequestSecurity} from "../model/request-security.enum";
import {RequestEngineService} from "./core/request-engine.service";
import {DataState, StatefulData} from "../model/core/stateful-data.model";
import {RequestExecutionStateEnum, RequestModelState} from "../model/state/request-model.state";
import {ExecutionResults} from "../model/request/execution-result";

@Injectable({
  providedIn: 'root'
})
export class RequestService {


  private readonly _requests$: BehaviorSubject<RequestModel[]>;
  public readonly requests$: Observable<RequestModel[]>;

  private readonly _requestAdded$: Subject<RequestModel> = new Subject<RequestModel>();
  private readonly _requestDeleted$: Subject<string> = new Subject<string>();

  private readonly _activeRequest$: BehaviorSubject<StatefulData<RequestModelState>> = new BehaviorSubject<StatefulData<RequestModelState>>(
    {state: DataState.UNDEFINED} as StatefulData<RequestModelState>
  );
  public readonly activeRequest$ = this._activeRequest$.asObservable();

  private readonly _requestSelected$: Subject<string> = new Subject();

  private readonly _requestUpdated$: Subject<{ id: string } & Partial<RequestModel>> = new Subject();

  constructor(private readonly router: Router,
              private readonly dataService: DataService,
              private readonly http: HttpClient,
              private readonly requestResultService: RequestResultService,
              private readonly requestEngineService: RequestEngineService) {
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
      tap(request => this._activeRequest$.next({
        data: {...request, state: RequestExecutionStateEnum.UNDEFINED},
        state: DataState.LOADED
      }))).subscribe();

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

    this.requestEngineService.requestExecuted$.subscribe((result:ExecutionResults) => {
      console.log("Request executed", result);
      this.requestResultService.onResultsReceived(result);
      this._activeRequest$.next({
        state: this._activeRequest$.value.state,
        data: {
          ...this._activeRequest$.value.data,
          state: RequestExecutionStateEnum.LOADED,
          timeEnded: new Date()
        }
      } as StatefulData<RequestModelState>)
    });

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
      params: [{
        position: 1,
        name: '',
        text_value: '',
        description: '',
        select: true
      }],
      headers: [
        {
          position: 1,
          name: '',
          text_value: '',
          select: true,
          description: ''
        }
      ]
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
    this._activeRequest$.next({
      state: this._activeRequest$.value.state,
      data: {
        ...requestModel,
        state: RequestExecutionStateEnum.LOADING,
        timeStarted: new Date()
      }
    } as StatefulData<RequestModelState>)
    this.requestEngineService.executeHttpRequest(requestModel);
  }

  changeQueryParameters(requestModel: RequestModel, $event: QueryParameterRow[]) {
    this._requestUpdated$.next({
      id: requestModel.id,
      params: $event
    });
  }


  changeHeaders(requestModel: RequestModel, $event: RequestHeaderRow[]) {
    this._requestUpdated$.next({
      id: requestModel.id,
      headers: $event
    });
  }

  handleBodyChange(requestModel: RequestModel, body: string) {
    this._requestUpdated$.next({
      id: requestModel.id,
      body: JSON.stringify(JSON.parse(body))
    })
  }

  changeType(requestModel: RequestModel, $event: RequestSecurity) {
    this._requestUpdated$.next({
      id: requestModel.id,
      type: $event
    })
  }
}


