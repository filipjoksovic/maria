import {
  Component,
  EventEmitter,
  inject,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Signal,
  SimpleChanges
} from '@angular/core';
import {RequestInputComponent} from '../../components/request-input/request-input.component';
import {RequestNameComponent} from '../../components/request-name/request-name.component';
import {ActivatedRoute} from "@angular/router";
import {RequestModel} from "../../app/model/request.model";
import {RequestService} from "../../app/services/request.service";
import {filter} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";
import {JsonPipe} from "@angular/common";
import {RequestTypeEnum} from "../../app/model/request-type.enum";
import {RequestResultComponent} from "../../components/request-result/request-result.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {
  QueryParameterRow,
  RequestQueryParametersComponent
} from "../../components/request-query-parameters/request-query-parameters.component";
import {MatTabsModule} from "@angular/material/tabs";
import {RequestHeaderRow, RequestHeadersComponent} from "../../components/request-headers/request-headers.component";
import {RequestBodyComponent} from "../../components/request-body/request-body.component";
import {CodeEditorComponent} from "@ngstack/code-editor";
import {RequestSecurity} from "../../app/model/request-security.enum";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {DataState, StatefulData} from "../../app/model/core/stateful-data.model";
import {RequestExecutionStateEnum, RequestModelState} from "../../app/model/state/request-model.state";
import {NzResizableModule, NzResizeEvent} from "ng-zorro-antd/resizable";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzTypographyModule} from "ng-zorro-antd/typography";

@Component({
  selector: 'app-make-request',
  templateUrl: './make-request.component.html',
  styleUrls: ['./make-request.component.css'],
  imports: [RequestInputComponent, RequestNameComponent, JsonPipe, RequestResultComponent, MatGridListModule, RequestQueryParametersComponent, MatTabsModule, RequestHeadersComponent, RequestBodyComponent, CodeEditorComponent, MatProgressBarModule, NzResizableModule, NzIconModule, NzTypographyModule],
  standalone: true,
})
export class MakeRequestComponent implements OnInit, OnChanges, OnDestroy {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly requestService = inject(RequestService);

  public requestState!: Signal<StatefulData<RequestModelState> | undefined>;
  defaultParameters: QueryParameterRow[] = [] as QueryParameterRow[];


  constructor() {
    this.requestState = toSignal(this.requestService.activeRequest$);
  }

  ngOnInit() {
    console.log('loading');
    this.activatedRoute.paramMap.pipe(filter(paramMap => paramMap.has("id"))).subscribe(params => {
      this.requestService.setActiveRequest(params.get("id"));
    })

  }

  ngOnDestroy() {
    console.log('destroying');
  }

  ngOnChanges(changes: SimpleChanges) {

  }


  handleNameChange(evt: string) {
    if (this.requestState() === undefined) {
      return;
    }
    console.log('hree');

    this.requestService.updateRequest(this.requestState()?.data!, {
      name: evt
    })
  }

  handleMethodChange($event: RequestTypeEnum) {
    if (this.requestState() === undefined) {
      return;
    }
    console.log('hree');

    this.requestService.updateRequest(this.requestState()?.data!, {
      method: $event
    })
  }

  handleUrlChange($event: string) {
    if (this.requestState() === undefined) {
      return;
    }
    this.requestService.updateRequest(this.requestState()?.data!, {
      url: $event
    })
  }

  handleSendRequest() {
    this.requestService.executeRequest(this.requestState()?.data!);
  }

  handleQueryParametersChange($event: QueryParameterRow[]) {
    this.requestService.changeQueryParameters(this.requestState()?.data!, $event);
  }

  handleRequestHeadersChange($event: RequestHeaderRow[]) {
    this.requestService.changeHeaders(this.requestState()?.data!, $event);

  }

  handleRequestBodyChange($event: string) {
    const body = $event;
    try {
      JSON.parse(body);
      console.log('valid JSON');
      this.requestService.handleBodyChange(this.requestState()?.data!, body);
    } catch (e) {
      console.log("Invalid JSON");
      return;
    }
  }

  handleTypeChanged($event: RequestSecurity) {
    this.requestService.changeType(this.requestState()?.data!, $event);
  }

  protected readonly DataState = DataState;
  protected readonly RequestExecutionStateEnum = RequestExecutionStateEnum;

}
