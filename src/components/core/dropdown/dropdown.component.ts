import { Component, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { DropdownData, DropdownDataConfiguration } from '../../../app/model/core/dropdown-data.model';
import { KeyValuePipe, NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  standalone: true,
  imports: [NgFor, KeyValuePipe, NgClass]
})
export class DropdownComponent<T extends number | symbol | string> implements OnInit {

  @Input({ required: true })
  data!: DropdownDataConfiguration<T>;

  isOpen: WritableSignal<boolean> = signal(false);
  activeItem!: WritableSignal<string>
  constructor() {
  }

  ngOnInit() {
    this.activeItem = signal(Object.keys(this.data)[0]);

  }

  public toggleDropdown() {
    this.isOpen.update((value: boolean) => {
      return !value;
    })
  }
  //TODO type properly
  public selectActiveElement(item: string) {
    console.log(item);
    this.activeItem.update(() => {
      return item;
    })
    this.isOpen.update((isOpen: boolean) => {
      return !isOpen;
    })

  }

}
