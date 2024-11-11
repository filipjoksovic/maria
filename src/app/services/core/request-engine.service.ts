import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpRequest} from "@angular/common/http";
import {BehaviorSubject, filter, Observable} from "rxjs";
import {RequestModel} from "../../model/request.model";
import {RequestTypeEnum} from "../../model/request-type.enum";
import {createHeaders, createHttpParams, generateRequestUrl} from "../../utils/request.utils";
import {ExecutionResults} from "../../model/request/execution-result";

/**
 * Service for executing and handling HTTP requests
 */
@Injectable({
  providedIn: 'root'
})
export class RequestEngineService {

  private readonly _requestExecuted$: BehaviorSubject<ExecutionResults | null> = new BehaviorSubject<ExecutionResults | null>(null);
  public readonly requestExecuted$: Observable<ExecutionResults> = this._requestExecuted$.asObservable().pipe(filter((result) => result !== null));

  constructor(private readonly http: HttpClient) {
  }

  public executeHttpRequest(requestModel: RequestModel): void {
    const request: RequestModel = {...requestModel};
    request.url = generateRequestUrl(request);

    const options = {
      params: createHttpParams(request),
      headers: createHeaders(request)
    }

    let request$: Observable<HttpEvent<any>>;
    switch (request.method) {
      case RequestTypeEnum.GET:
        request$ = this.handleGet(request, options);
        break;
      case RequestTypeEnum.POST:
        request$ = this.handlePost(request, options);
        break;
      case RequestTypeEnum.PUT:
        request$ = this.handlePut(request, options);
        break;
      case RequestTypeEnum.DELETE:
        request$ = this.handleDelete(request, options);
        break;
      default:
        throw new Error("Unknown request type");
    }

    request$.subscribe({
      next: (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          this._requestExecuted$.next({
            requestId: request.id,
            code: event.status,
            status: event.statusText,
            body: event.body,
            headers: event.headers
          })
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error("Error occurred while executing request", error);
        this._requestExecuted$.next({
          requestId: request.id,
          code: error.status,
          status: error.error,
          body: error.message,
          headers: error.headers
        })
      }
    })
  }

  private handleDelete(requestModel: RequestModel, options: object) {
    const request = new HttpRequest('DELETE', requestModel.url, options);

    return this.execute(request);
  }

  private handlePut(requestModel: RequestModel, options: object) {
    const request = new HttpRequest('PUT', requestModel.url, requestModel.body, options);

    return this.execute(request);
  }

  private handleGet(requestModel: RequestModel, options: object) {
    const request = new HttpRequest('GET', requestModel.url, options);
    return this.execute(request);
  }

  private handlePost(requestModel: RequestModel, options: object) {
    const request = new HttpRequest('POST', requestModel.url, requestModel.body, options);

    return this.execute(request);
  }

  private execute(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.http.request(request);
  }
}
