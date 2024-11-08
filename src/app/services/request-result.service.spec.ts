import { TestBed } from '@angular/core/testing';

import { RequestResultService } from './request-result.service';

describe('RequestResultService', () => {
  let service: RequestResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
