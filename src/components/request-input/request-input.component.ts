import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AddressInputComponent} from '../address-input/address-input.component';
import {DropdownComponent} from "../core/dropdown/dropdown.component";
import {RequestConfiguration, typeConfigs} from '../../app/model/request-type.config';
import {ButtonComponent} from '../core/button/button.component';
import {RequestModel} from "../../app/model/request.model";
import {RequestTypeEnum} from "../../app/model/request-type.enum";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {filter, map, pairwise, startWith, tap} from "rxjs";

@Component({
  selector: 'app-request-input',
  templateUrl: './request-input.component.html',
  styleUrls: ['./request-input.component.css'],
  standalone: true,
  imports: [AddressInputComponent, DropdownComponent, ButtonComponent, ReactiveFormsModule]
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

  public requestForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.requestForm = formBuilder.group({
      method: new FormControl(""),
      url: new FormControl("", Validators.required),
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
        })
      }
    );
  }

  ngOnInit() {
  }

  public dispatchSendRequest(): void {
    console.log("Sending request");
    this.sendRequest.emit();
  }

  methodSelected($event: number | symbol | string) {
    this.methodChanged.emit($event as RequestTypeEnum);
  }
}
