import { TestBed } from '@angular/core/testing';

import { RequestEngineService } from './request-engine.service';

describe('RequestEngineService', () => {
  let service: RequestEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
