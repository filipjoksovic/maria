import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RequestSecurityConfiguration, securityConfigs} from '../../app/model/request-security.config';
import {KeyValuePipe, NgFor} from '@angular/common';
import {DropdownComponent} from "../core/dropdown/dropdown.component";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.css'],
  standalone: true,
  imports: [NgFor, KeyValuePipe, DropdownComponent, ReactiveFormsModule]
})
export class AddressInputComponent implements OnInit {

  public securityConfigs: RequestSecurityConfiguration = securityConfigs;

  public form: FormGroup<{ address: FormControl<string | null> }>

  @Output()
  urlChanged: EventEmitter<string> = new EventEmitter();

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      address: new FormControl<string>('', Validators.required)
    })
  }

  ngOnInit() {
  }

  handleUrlChanged($event: Event) {
    this.urlChanged.emit(($event.target as HTMLInputElement).value);

  }
}
