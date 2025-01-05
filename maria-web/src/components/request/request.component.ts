import {Component, EventEmitter, inject, Input, OnInit, Output, signal, WritableSignal} from '@angular/core';
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatTab, MatTabContent, MatTabGroup} from "@angular/material/tabs";
import {RequestBodyComponent} from "../request-body/request-body.component";
import {RequestHeaderRow, RequestHeadersComponent} from "../request-headers/request-headers.component";
import {RequestInputComponent} from "../request-input/request-input.component";
import {RequestNameComponent} from "../request-name/request-name.component";
import {
  QueryParameterRow,
  RequestQueryParametersComponent
} from "../request-query-parameters/request-query-parameters.component";
import {RequestResultComponent} from "../request-result/request-result.component";
import {RequestService} from "../../app/services/request.service";
import {DataState, StatefulData} from "../../app/model/core/stateful-data.model";
import {RequestExecutionStateEnum, RequestModelState} from "../../app/model/state/request-model.state";
import {RequestTypeEnum} from "../../app/model/request-type.enum";
import {RequestSecurity} from "../../app/model/request-security.enum";
import {getBlankRequest} from "../../app/utils/request.utils";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [
    MatProgressBar,
    MatTab,
    MatTabContent,
    MatTabGroup,
    RequestBodyComponent,
    RequestHeadersComponent,
    RequestInputComponent,
    RequestNameComponent,
    RequestQueryParametersComponent,
    RequestResultComponent,
    JsonPipe
  ],
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss'
})
export class RequestComponent implements OnInit {

  private readonly requestService: RequestService = inject(RequestService);

  @Output()
  public requestChange: EventEmitter<{ field: string, value: string }> = new EventEmitter<{
    field: string,
    value: string
  }>();

  @Input({required: true})
  requestState!: StatefulData<RequestModelState>;

  ngOnInit() {

  }

  handleNameChange(evt: string) {
    this.requestChange.emit({field: "name", value: evt});
  }

  handleMethodChange($event: RequestTypeEnum) {
    this.requestChange.emit({field: "method", value: $event});
  }

  handleUrlChange($event: string) {
    this.requestChange.emit({field: "url", value: $event});
  }

  handleSendRequest() {
  }

  handleQueryParametersChange($event: QueryParameterRow[]) {
    this.requestChange.emit({field: "params", value: JSON.stringify($event)});
  }

  handleRequestHeadersChange($event: RequestHeaderRow[]) {
    this.requestChange.emit({field: "headers", value: JSON.stringify($event)});
  }

  handleRequestBodyChange($event: string) {
    this.requestChange.emit({field: "body", value: $event});
  }

  handleTypeChanged($event: RequestSecurity) {
    this.requestChange.emit({field: "type", value: $event});
  }


  protected readonly RequestExecutionStateEnum = RequestExecutionStateEnum;
}
