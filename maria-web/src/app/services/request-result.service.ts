import {Injectable} from '@angular/core';
import {RequestModel} from "../model/request.model";
import {BehaviorSubject} from "rxjs";
import {RequestResultModel} from "../model/request/request-result.model";
import {HttpResponse} from "@angular/common/http";
import {ExecutionResults} from "../model/request/execution-result";
import {getTimeDifference} from "../utils/date.utils";


@Injectable({
  providedIn: 'root'
})
export class RequestResultService {

  private readonly _requestResult$: BehaviorSubject<RequestResultModel> = new BehaviorSubject({
    responseContent: "",
    requestStatus: 200
  } as RequestResultModel);
  public readonly requestResult$ = this._requestResult$.asObservable();

  constructor() {
  }

  public onResultsReceived(request: ExecutionResults) {
    console.log("Result received for request: ", request.requestId, JSON.stringify(request, null, "\t"));
    const requestModel: RequestResultModel = {
      responseContent: JSON.stringify(request.body, null, "\t"),
      requestStatus: request.code,
      requestStatusText: request.status,
      timeStarted: request.timeStarted,
      timeEnded: request.timeEnded,
      timeTaken: getTimeDifference(request.timeStarted, request.timeEnded)
    }
    this._requestResult$.next(requestModel);
  }
}
