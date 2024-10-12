import { Component, Input, OnInit } from '@angular/core';
import { RequestModel } from '../../app/model/request.model';
import { NgClass } from '@angular/common';
import { typeConfigs } from '../../app/model/request-type.config';

@Component({
  selector: 'app-request-link',
  templateUrl: './request-link.component.html',
  styleUrls: ['./request-link.component.css'],
  standalone: true,
  imports: [NgClass]
})
export class RequestLinkComponent implements OnInit {

  @Input({ required: true })
  public request!: RequestModel;

  constructor() { }

  ngOnInit() {
  }

  getRequestMethodColor(){
    return typeConfigs[this.request.method].color;
  }

}
