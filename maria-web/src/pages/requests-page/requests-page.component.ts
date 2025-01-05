import {Component, inject, OnInit} from '@angular/core';
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {MakeRequestComponent} from "../make-request/make-request.component";
import {RequestComponent} from "../../components/request/request.component";
import {ActiveRequestsService} from "../../app/services/active-requests.service";
import {filter, map, tap} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";
import {NzEmptyComponent} from "ng-zorro-antd/empty";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-requests-page',
  standalone: true,
  imports: [NzTabsModule, MakeRequestComponent, RequestComponent, NzEmptyComponent, JsonPipe],
  templateUrl: './requests-page.component.html',
  styleUrl: './requests-page.component.scss'
})
export class RequestsPageComponent implements OnInit {
  private readonly activeRequestsService: ActiveRequestsService = inject(ActiveRequestsService);
  private readonly activeRequests$ = this.activeRequestsService.activeRequests$.pipe(tap((data) => {
    console.log('activeRequests$', data);
  }));

  readonly activeRequests = toSignal(this.activeRequests$);

  private readonly activeRequest$ = this.activeRequestsService.activeRequestIndex$.pipe(
    filter(index => index > -1),
  );

  tabs = this.activeRequests;

  public selectedIndex: number = 0;

  closeTab({index}: { index: number }): void {
    // this.tabs.splice(index, 1);
  }

  newTab(): void {
    // this.tabs.push('New Tab');
    // this.selectedIndex = this.tabs.length;
  }

  handleRequestChange($event: { field: string; value: string }) {
    console.log($event);
  }

  ngOnInit() {
    this.activeRequestsService._activeRequestIndex$.pipe(
      tap((data) => console.log("Logging data", data)),
      tap(value => this.selectedIndex = value)
    ).subscribe(); //todo memory leak
  }

}
