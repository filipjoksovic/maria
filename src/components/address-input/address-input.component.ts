import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RequestSecurityConfiguration, securityConfigs} from '../../app/model/request-security.config';
import {KeyValuePipe, NgFor} from '@angular/common';
import {DropdownComponent} from "../core/dropdown/dropdown.component";
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {RequestSecurity} from "../../app/model/request-security.enum";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
  selector: 'app-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.css'],
  standalone: true,
  imports: [NgFor, KeyValuePipe, DropdownComponent, ReactiveFormsModule, MatFormFieldModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AddressInputComponent
    }
  ]
})
export class AddressInputComponent implements OnInit, ControlValueAccessor {

  public securityConfigs: RequestSecurityConfiguration = securityConfigs;

  public value: string = "";

  public activeType: RequestSecurity = RequestSecurity.HTTP;

  @Output()
  urlChanged: EventEmitter<string> = new EventEmitter();

  ngOnInit() {
    console.log("Request value", this.value);
  }

  handleUrlChanged($event: Event) {
    this.onChange((<HTMLInputElement>$event.target).value);
  }

  onChange = (value: string) => {
  };

  onTouched = () => {
  };

  touched = false;

  disabled = false;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  setTouchedState(isTouched: boolean): void {
    this.touched = isTouched;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  markAsTouched(): void {
    this.onTouched();
  }

  handleValueChanged(event: RequestSecurity) {
    this.activeType = event;
    console.log(event);
    const requestPrefix = this.securityConfigs[event].text;

    this.value = this.securityConfigs[event].text + this.value;
    this.writeValue(this.value);
  }
}
