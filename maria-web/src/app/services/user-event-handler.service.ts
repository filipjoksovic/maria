import { Injectable } from '@angular/core';
import { UserService, UserServiceEvent } from './user/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserEventHandlerService {

  constructor(private readonly userService: UserService, private readonly router: Router) {
    console.log("Injected 1");

    this.userService.eventDispatcher$.subscribe((event: UserServiceEvent) => {
      console.log('event received', event);
      this.handleEvent(event);
    })

  }

  private handleEvent(event: Readonly<UserServiceEvent>) {
    switch (event) {
      case UserServiceEvent.START_USE:
        this.handleStartUseEvent();
    }
  }

  private handleStartUseEvent(): void {
    this.router.navigate(['setup'])
  }

}
