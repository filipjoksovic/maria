import { Component, OnInit } from '@angular/core';
import { AddressInputComponent } from '../address-input/address-input.component';
import { DropdownComponent } from "../core/dropdown/dropdown.component";
import { RequestConfiguration, typeConfigs } from '../../app/model/request-type.config';
import { ButtonComponent } from '../core/button/button.component';

@Component({
  selector: 'app-request-input',
  templateUrl: './request-input.component.html',
  styleUrls: ['./request-input.component.css'],
  standalone: true,
  imports: [AddressInputComponent, DropdownComponent, ButtonComponent]
})
export class RequestInputComponent implements OnInit {
  protected requestConfig: RequestConfiguration = typeConfigs;

  constructor() { }

  ngOnInit() {
  }

  public dispatchSendRequest(): void {
    console.log("Sending request");
  }

}
