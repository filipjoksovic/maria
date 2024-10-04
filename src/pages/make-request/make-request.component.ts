import { Component, OnInit } from '@angular/core';
import { RequestInputComponent } from '../../components/request-input/request-input.component';

@Component({
  selector: 'app-make-request',
  templateUrl: './make-request.component.html',
  styleUrls: ['./make-request.component.css'],
  imports: [RequestInputComponent],
  standalone: true
})
export class MakeRequestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
