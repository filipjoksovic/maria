import {Component, Input} from '@angular/core';
import {DropdownDataConfiguration} from '../../../app/model/core/dropdown-data.model';
import {KeyValuePipe, NgClass, NgFor} from '@angular/common';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectChange, MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  standalone: true,
  imports: [NgFor, KeyValuePipe, NgClass, ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DropdownComponent
    }
  ]
})
export class DropdownComponent<T extends number | symbol | string> implements ControlValueAccessor {

  @Input({required: true})
  data!: DropdownDataConfiguration<T>;

  @Input({required: true})
  label: string = "Select";

  @Input()
  public activeValue: T = "" as unknown as T;

  public handleSelectionChange($event: MatSelectChange) {
    console.log($event);
    this.onChange($event.value);
  }

  onChange = (value: T) => {
  };
  onTouched = () => {
  };

  touched = false;

  disabled = false;

  writeValue(obj: any): void {
    this.markAsTouched();
    this.activeValue = obj;
    this.onChange(this.activeValue);
  }

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

  markAsTouched(): void {
    this.onTouched();
  }

}
