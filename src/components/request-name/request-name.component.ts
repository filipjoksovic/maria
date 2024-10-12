import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {RequestModel} from "../../app/model/request.model";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-request-name',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './request-name.component.html',
  styleUrl: './request-name.component.scss'
})
export class RequestNameComponent implements OnInit, OnChanges {

  @Input()
  public request!: RequestModel | undefined;

  @Output()
  public nameBlurred: EventEmitter<string> = new EventEmitter<string>();

  private _value: string = this.request?.name ?? "New request";

  public get value() {
    return this._value;
  }

  public set value(val: string) {
    this._value = val;
  }

  public onNameBlurred(e: FocusEvent) {
    this.nameBlurred.emit(this.value);
  }

  ngOnInit() {
    this.value = this.request?.name ?? "New Request";
  }

  ngOnChanges(changes: SimpleChanges) {
    this.value = this.request?.name ?? "New Request"
  }
}
