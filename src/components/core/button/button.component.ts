import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  standalone: true,
  imports:[NgClass]
})
export class ButtonComponent implements OnInit {

  @Input()
  public label: string = "";

  @Input()
  public classList: string = "";

  constructor() { }

  ngOnInit() {
  }

}
