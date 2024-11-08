import {Component, EventEmitter, Input, OnInit, Output, signal, WritableSignal} from '@angular/core';
import {DropdownData, DropdownDataConfiguration} from '../../../app/model/core/dropdown-data.model';
import {KeyValuePipe, NgClass, NgFor} from '@angular/common';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  standalone: true,
  imports: [NgFor, KeyValuePipe, NgClass]
})
export class DropdownComponent<T extends number | symbol | string> implements OnInit {

  @Input({required: true})
  data!: DropdownDataConfiguration<T>;

  @Output()
  closed: EventEmitter<T> = new EventEmitter<T>();

  @Output()
  open: EventEmitter<T> = new EventEmitter<T>();

  isOpen: WritableSignal<boolean> = signal(false);
  activeItem!: WritableSignal<T>

  constructor() {
  }

  ngOnInit() {
    this.activeItem = signal(Object.keys(this.data)[0] as T);

  }

  public toggleDropdown() {
    this.isOpen.update((value: boolean) => {
      return !value;
    });

    if (this.isOpen()) {
      this.open.emit(this.activeItem());
    } else {
      this.closed.emit(this.activeItem());
    }
  }

  //TODO type properly
  public selectActiveElement(item: string) {
    console.log(item);
    this.activeItem.update(() => {
      return item as T;
    })
    this.isOpen.update((isOpen: boolean) => {
      return !isOpen;
    })

  }

}
