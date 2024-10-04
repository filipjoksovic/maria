import { Component, inject, OnInit } from '@angular/core';
import { UserService, UserServiceEvent } from '../../app/services/user.service';
import { UserEventHandlerService } from '../../app/services/user-event-handler.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {

  private readonly userService: UserService = inject(UserService);
  private readonly userEventService: UserEventHandlerService = inject(UserEventHandlerService);
  constructor() { }

  ngOnInit() {
  }

  public handleStartClicked(): void {
    this.userService.dispatchEvent(UserServiceEvent.START_USE);
  }
}
