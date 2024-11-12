import {Component, EventEmitter, Input, OnInit, Output, Signal} from '@angular/core';
import {RequestModel} from '../../app/model/request.model';
import {NgClass} from '@angular/common';
import {typeConfigs} from '../../app/model/request-type.config';
import {MatIcon} from '@angular/material/icon';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {filter, map, tap} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {RequestService} from '../../app/services/request.service';
import {DataState} from "../../app/model/core/stateful-data.model";

@Component({
  selector: 'app-request-link',
  templateUrl: './request-link.component.html',
  styleUrls: ['./request-link.component.css'],
  standalone: true,
  imports: [NgClass, MatIcon, RouterLink]
})
export class RequestLinkComponent implements OnInit {

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

}
