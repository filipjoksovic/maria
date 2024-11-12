import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestQueryParametersComponent } from './request-query-parameters.component';

describe('RequestQueryParametersComponent', () => {
  let component: RequestQueryParametersComponent;
  let fixture: ComponentFixture<RequestQueryParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestQueryParametersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestQueryParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
