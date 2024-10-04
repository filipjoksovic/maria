/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Home.pageComponent } from './home.page.component';

describe('Home.pageComponent', () => {
  let component: Home.pageComponent;
  let fixture: ComponentFixture<Home.pageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Home.pageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Home.pageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
