/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserEventHandlerService } from './user-event-handler.service';

describe('Service: UserEventHandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserEventHandlerService]
    });
  });

  it('should ...', inject([UserEventHandlerService], (service: UserEventHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
