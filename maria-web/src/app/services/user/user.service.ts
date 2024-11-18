import {Injectable} from '@angular/core';
import {BehaviorSubject, filter, never} from 'rxjs';
import {UserModel} from "../../model/user/user.model";
import {UserApiService} from "./user-api.service";
import {DataState, StatefulData} from "../../model/core/stateful-data.model";
import {DataService} from "../data.service";
import {Router} from "@angular/router";

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

  private readonly _user$: BehaviorSubject<StatefulData<UserModel>> = new BehaviorSubject<StatefulData<UserModel>>({
    state: DataState.UNDEFINED,
  } as StatefulData<UserModel>);

  public readonly user$ = this._user$.asObservable().pipe(filter((statefulData: StatefulData<UserModel>) => statefulData.state !== DataState.UNDEFINED));

  constructor(private readonly router: Router, private readonly storageService: DataService, private readonly userService: UserApiService) {
    this.user$.pipe(filter((statefulData: StatefulData<UserModel>) => statefulData.state === DataState.LOADED)).subscribe(_ => {
      this.storageService.store("user", _.data);
      console.log("User data stored", _.data);
    });
  }

  public dispatchEvent(event: UserServiceEvent) {
    this._eventDispatcher$.next(event);
  }

  public createUser(user: Partial<UserModel>) {
    this._user$.next({
      state: DataState.LOADING,
    } as StatefulData<UserModel>);

    this.userService.createUser(user).subscribe({
      next: (user: UserModel) => {
        this._user$.next({
          state: DataState.LOADED,
          data: user
        } as StatefulData<UserModel>);
      },
      error: (error: any) => {
        this._user$.next({
          state: DataState.ERROR,
          error: error
        } as StatefulData<UserModel>);
      }
    });
  }

  resolveUser() {
    const userFromStorage: UserModel = this.storageService.get("user") as UserModel;

    if (!userFromStorage) {
      this.router.navigate(['/account/signup']);
    }

    this.userService.getUser(userFromStorage.id).subscribe({
      next: (user: UserModel) => {
        this._user$.next({
          state: DataState.LOADED,
          data: user
        } as StatefulData<UserModel>);
      },
      error: (error: any) => {
        this._user$.next({
          state: DataState.ERROR,
          error: error
        } as StatefulData<UserModel>);
      }
    });
  }
}

