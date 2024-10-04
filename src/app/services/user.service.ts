import { publishFacade, WriteKeyExpr } from '@angular/compiler';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export enum UserServiceEvent {
  INIT = "INIT",
  START_USE = "START_USE"
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _eventDispatcher$: BehaviorSubject<UserServiceEvent> = new BehaviorSubject<UserServiceEvent>(UserServiceEvent.INIT);
  public readonly eventDispatcher$ = this._eventDispatcher$.asObservable();

  constructor() {
    console.log("Injected 2");
   }

  public dispatchEvent(event: UserServiceEvent) {
    console.log("Dispatching event", event);

    this._eventDispatcher$.next(event);
  }

}

