import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  standalone: true,
  imports: [NgClass]
})
export class ButtonComponent implements OnInit {

  @Input()
  public label: string = "";

  @Input()
  public classList: string = "";

  @Output()
  public clicked: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public handleClicked(): void {
    this.clicked.emit();
  }

}
