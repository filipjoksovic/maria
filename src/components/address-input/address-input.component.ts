import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {RequestSecurityConfiguration, securityConfigs} from '../../app/model/request-security.config';
import {KeyValuePipe, NgFor} from '@angular/common';
import {DropdownComponent} from "../core/dropdown/dropdown.component";
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup, NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.css'],
  standalone: true,
  imports: [NgFor, KeyValuePipe, DropdownComponent, ReactiveFormsModule],
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
    this.markAsTouched();
    this.value = value;
    this.onChange(value);
  }

  markAsTouched(): void {
    this.onTouched();
  }


}
