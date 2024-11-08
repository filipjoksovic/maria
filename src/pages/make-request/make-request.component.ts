import {Component, EventEmitter, inject, OnChanges, OnInit, Output, Signal, SimpleChanges} from '@angular/core';
import {RequestInputComponent} from '../../components/request-input/request-input.component';
import {RequestNameComponent} from '../../components/request-name/request-name.component';
import {ActivatedRoute} from "@angular/router";
import {RequestModel} from "../../app/model/request.model";
import {RequestService} from "../../app/services/request.service";
import {filter} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";
import {JsonPipe} from "@angular/common";
import {RequestTypeEnum} from "../../app/model/request-type.enum";

@Component({
  selector: 'app-make-request',
  templateUrl: './make-request.component.html',
  styleUrls: ['./make-request.component.css'],
  imports: [RequestInputComponent, RequestNameComponent, JsonPipe],
  standalone: true
})
export class MakeRequestComponent implements OnInit, OnChanges {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly requestService = inject(RequestService);

  public request!: Signal<RequestModel | undefined>;


  constructor() {
    this.request = toSignal(this.requestService.activeRequest$);
  }

  ngOnInit() {
    console.log('loading');
    this.activatedRoute.paramMap.pipe(filter(paramMap => paramMap.has("id"))).subscribe(params => {
      this.requestService.setActiveRequest(params.get("id"));
    })

  }

  ngOnChanges(changes: SimpleChanges) {

  }


  handleNameChange(evt: string) {
    if (this.request() === undefined) {
      return;
    }
    console.log('hree');

    this.requestService.updateRequest(this.request()!, {
      name: evt
    })
  }

  handleMethodChange($event: RequestTypeEnum) {
    if (this.request() === undefined) {
      return;
    }
    console.log('hree');

    this.requestService.updateRequest(this.request()!, {
      method: $event
    })
  }

  handleUrlChange($event: string) {
    if (this.request() === undefined) {
      return;
    }
    console.log('hree');

    this.requestService.updateRequest(this.request()!, {
      url: $event
    })
  }
}
