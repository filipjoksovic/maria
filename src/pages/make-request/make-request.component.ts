import {Component, OnInit} from '@angular/core';
import {RequestInputComponent} from '../../components/request-input/request-input.component';
import {RequestNameComponent} from '../../components/request-name/request-name.component';

@Component({
  selector: 'app-make-request',
  templateUrl: './make-request.component.html',
  styleUrls: ['./make-request.component.css'],
  imports: [RequestInputComponent, RequestNameComponent],
  standalone: true
})
export class MakeRequestComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
