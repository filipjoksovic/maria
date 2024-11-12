import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AddressInputComponent} from '../address-input/address-input.component';
import {DropdownComponent} from "../core/dropdown/dropdown.component";
import {RequestConfiguration, typeConfigs} from '../../app/model/request-type.config';
import {ButtonComponent} from '../core/button/button.component';
import {RequestModel} from "../../app/model/request.model";
import {RequestTypeEnum} from "../../app/model/request-type.enum";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {filter, map, pairwise, startWith, tap} from "rxjs";
import {securityConfigs} from "../../app/model/request-security.config";
import {RequestSecurity} from "../../app/model/request-security.enum";
import {MatButton} from "@angular/material/button";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-request-input',
  templateUrl: './request-input.component.html',
  styleUrls: ['./request-input.component.css'],
  standalone: true,
  imports: [AddressInputComponent, DropdownComponent, ButtonComponent, ReactiveFormsModule, MatButton, JsonPipe]
})
export class RequestInputComponent implements OnInit {
  protected requestConfig: RequestConfiguration = typeConfigs;

  private _request!: RequestModel | undefined;

  @Input()
  public set request(value: RequestModel | undefined) {
    this._request = value;
    this.requestForm?.patchValue({
      method: value?.method,
      url: value?.url,
      type: value?.type
    })
  }

  public get request(): RequestModel | undefined {
    return this._request;
  }

  @Output()
  public sendRequest: EventEmitter<void> = new EventEmitter<void>;

  @Output()
  public methodChanged: EventEmitter<RequestTypeEnum> = new EventEmitter<RequestTypeEnum>;

  @Output()
  public urlChanged: EventEmitter<string> = new EventEmitter();

  @Output()
  public typeChanged: EventEmitter<RequestSecurity> = new EventEmitter();

  public requestForm!: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {

  }

  ngOnInit() {
    console.log(this.request);
    this.requestForm = this.formBuilder.group({
      method: new FormControl(this.request?.method),
      url: new FormControl(this.request?.url, Validators.required),
      type: new FormControl(this.request?.type),
    })

    this.requestForm.valueChanges.pipe(
      startWith(this.requestForm.value),
      pairwise(),
      map(([oldState, newState]) => {
        console.log(oldState, newState);
        let changes: { [key in string]: string } = {};
        for (const key in newState) {
          console.log(`Checking ${key}`)
          console.log(`Old value: ${oldState[key]}, New value: ${newState[key]}`);
          if (oldState[key] !== newState[key] && oldState[key] !== undefined) {
            changes[key] = newState[key];
          }
        }
        return Object.keys(changes).map(key => {
          return [key, changes[key]]
        });
      }),
      filter(changes => Object.keys(changes).length !== 0)
    ).subscribe(
      values => {
        values.forEach(([key, value]) => {
          console.log(`Key: ${key}, Value: ${value}`);
          if (key === "url") {
            this.urlChanged.emit(value);
          }
          if (key === "method") {
            this.methodChanged.emit(value as RequestTypeEnum);
          }
          if (key === "type") {
            this.typeChanged.emit(value as RequestSecurity);
          }
        })
      }
    );
  }

  public dispatchSendRequest(): void {
    console.log("Sending request");
    this.sendRequest.emit();
  }

  protected readonly securityConfigs = securityConfigs;
}
