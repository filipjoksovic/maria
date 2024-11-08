import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AddressInputComponent} from '../address-input/address-input.component';
import {DropdownComponent} from "../core/dropdown/dropdown.component";
import {RequestConfiguration, typeConfigs} from '../../app/model/request-type.config';
import {ButtonComponent} from '../core/button/button.component';
import {RequestModel} from "../../app/model/request.model";
import {RequestTypeEnum} from "../../app/model/request-type.enum";

@Component({
  selector: 'app-request-input',
  templateUrl: './request-input.component.html',
  styleUrls: ['./request-input.component.css'],
  standalone: true,
  imports: [AddressInputComponent, DropdownComponent, ButtonComponent]
})
export class RequestInputComponent implements OnInit {
  protected requestConfig: RequestConfiguration = typeConfigs;

  @Input()
  public request!: RequestModel | undefined;

  @Output()
  public sendRequest: EventEmitter<void> = new EventEmitter<void>;

  @Output()
  public methodChanged: EventEmitter<RequestTypeEnum> = new EventEmitter<RequestTypeEnum>;

  @Output()
  public urlChanged: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  public dispatchSendRequest(): void {
    console.log("Sending request");
  }

  methodSelected($event: number | symbol | string) {
    this.methodChanged.emit($event as RequestTypeEnum);
  }
}
