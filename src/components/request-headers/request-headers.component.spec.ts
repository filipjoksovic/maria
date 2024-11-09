import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestHeadersComponent } from './request-headers.component';

describe('RequestHeadersComponent', () => {
  let component: RequestHeadersComponent;
  let fixture: ComponentFixture<RequestHeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestHeadersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestHeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
