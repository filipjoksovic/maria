import {Injectable} from '@angular/core';
import {RequestModel} from "../model/request.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RequestResultService {

  private readonly _requestResult$: BehaviorSubject<string> = new BehaviorSubject("");
  public readonly requestResult$ = this._requestResult$.asObservable();

  constructor() {
  }

  public onResultReceived(request: RequestModel, response: any) {
    console.log("Result received for request: ", request.id, JSON.stringify(response,null,"\t"));
    this._requestResult$.next(JSON.stringify(response, null, "\t"));
  }
}
