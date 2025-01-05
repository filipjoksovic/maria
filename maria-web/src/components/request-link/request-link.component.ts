import {Component, EventEmitter, inject, Input, OnInit, Output, Signal} from '@angular/core';
import {RequestModel} from '../../app/model/request.model';
import {NgClass} from '@angular/common';
import {typeConfigs} from '../../app/model/request-type.config';
import {MatIcon} from '@angular/material/icon';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {filter, map, tap} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {RequestService} from '../../app/services/request.service';
import {DataState} from "../../app/model/core/stateful-data.model";
import {NzMenuItemComponent} from "ng-zorro-antd/menu";
import {ActiveRequestsService} from "../../app/services/active-requests.service";

@Component({
  selector: 'app-request-link',
  templateUrl: './request-link.component.html',
  styleUrls: ['./request-link.component.css'],
  standalone: true,
  imports: [NgClass, MatIcon, RouterLink, NzMenuItemComponent]
})
export class RequestLinkComponent implements OnInit {

  private readonly activeRequestsService: ActiveRequestsService = inject(ActiveRequestsService);

  @Input({required: true})
  public request!: RequestModel;

  @Output()
  public requestDeleted: EventEmitter<string> = new EventEmitter<string>();

  public activeUrl$!: Signal<string>;

  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly requestService: RequestService) {
    console.log(this.request);
    this.activeUrl$ = toSignal(this.requestService.activeRequest$.pipe(
      tap(console.log),
      filter(data => data.state == DataState.LOADED),
      map(data => data.data),
      map(data => data.id)
    ));
  }

  ngOnInit() {

  }

  getRequestMethodColor() {
    return typeConfigs[this.request.method].color;
  }

  handleDeleteRequest(requestUuid: string) {
    this.requestDeleted.emit(requestUuid);
  }

  addToActiveRequests(request: RequestModel) {
    this.activeRequestsService.selectRequest(request);
  }
}
