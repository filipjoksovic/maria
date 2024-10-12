import {Component, inject, OnInit, Signal} from '@angular/core';
import {RequestInputComponent} from '../../components/request-input/request-input.component';
import {RequestNameComponent} from '../../components/request-name/request-name.component';
import {ActivatedRoute} from "@angular/router";
import {RequestModel} from "../../app/model/request.model";
import {RequestService} from "../../app/services/request.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-make-request',
  templateUrl: './make-request.component.html',
  styleUrls: ['./make-request.component.css'],
  imports: [RequestInputComponent, RequestNameComponent],
  standalone: true
})
export class MakeRequestComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly requestService = inject(RequestService);

  public request!: Signal<RequestModel>;


  constructor() {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(filter(paramMap => paramMap.has("id"))).subscribe(params => {
      this.requestService.setActiveRequest(params.get("id"));
    })
  }


}
