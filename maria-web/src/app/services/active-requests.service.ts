import {Injectable} from '@angular/core';
import {DataState, StatefulData} from "../model/core/stateful-data.model";
import {RequestExecutionStateEnum, RequestModelState} from "../model/state/request-model.state";
import {BehaviorSubject} from "rxjs";
import {RequestModel} from "../model/request.model";
import {getBlankRequest, getStatelessRequest} from "../utils/request.utils";

@Injectable({
  providedIn: 'root'
})
export class ActiveRequestsService {

  private readonly _activeRequests: BehaviorSubject<StatefulData<RequestModelState>[]> = new BehaviorSubject([] as StatefulData<RequestModelState>[]);
  public readonly activeRequests$ = this._activeRequests.asObservable();

  public readonly _activeRequestIndex$ = new BehaviorSubject<number>(-1);
  public readonly activeRequestIndex$ = this._activeRequestIndex$.asObservable();


  constructor() {
  }

  public addRequest(request: RequestModel) {
    console.log(request);
    const activeRequests = this._activeRequests.getValue();
    this._activeRequests.next([...activeRequests, {
      state: DataState.LOADED,
      data: {...request, state: RequestExecutionStateEnum.LOADED}
    }]);
    this._activeRequestIndex$.next(this._activeRequests.value.length);
  }

  public selectRequest(request: RequestModel) {
    const requestOpenIndex = this._activeRequests.getValue().findIndex(r => r.data.id === request.id);
    console.log(requestOpenIndex);
    if (requestOpenIndex > -1) {
      this._activeRequestIndex$.next(requestOpenIndex);
    } else {
      console.log("adding");
      this.addRequest(request);
    }
  }

  createBlankRequest() {
    const activeRequests = this._activeRequests.getValue();

    this._activeRequests.next([...activeRequests, {
      state: DataState.LOADED,
      data: {...getStatelessRequest(), state: RequestExecutionStateEnum.LOADED}
    }]);
    this._activeRequestIndex$.next(this._activeRequests.value.length);
  }
}
