import { TestBed } from '@angular/core/testing';

import { ActiveRequestsService } from './active-requests.service';

describe('ActiveRequestsService', () => {
  let service: ActiveRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
