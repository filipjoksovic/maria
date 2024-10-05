import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private _requestAddress$: BehaviorSubject<string> = new BehaviorSubject("");
  public requestAddress$: Observable<string> = this._requestAddress$.pipe(filter(v => v !== ""));
  constructor() { }

}
