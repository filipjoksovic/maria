import { Component, EventEmitter, Input, OnInit, Output, Signal } from '@angular/core';
import { RequestModel } from '../../app/model/request.model';
import { NgClass } from '@angular/common';
import { typeConfigs } from '../../app/model/request-type.config';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, ParamMap, Route, Router, RouterLink } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { RequestSecurity } from '../../app/model/request-security.enum';
import { RequestService } from '../../app/services/request.service';

@Component({
  selector: 'app-request-link',
  templateUrl: './request-link.component.html',
  styleUrls: ['./request-link.component.css'],
  standalone: true,
  imports: [NgClass, MatIcon, RouterLink]
})
export class RequestLinkComponent implements OnInit {

  @Input({ required: true })
  public request!: RequestModel;

  @Output()
  public requestDeleted: EventEmitter<string> = new EventEmitter<string>();

  public isActive$!: Signal<boolean>;

  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly requestService: RequestService) {

    this.route.paramMap.pipe(tap(console.log), map((paramMap: ParamMap) =>
      paramMap.has("id")
    ), tap(console.log)).subscribe();
    this.isActive$ = toSignal(this.route.paramMap.pipe(tap(console.log), map((paramMap: ParamMap) =>
      paramMap.has("id")
    ), tap(console.log)));

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
