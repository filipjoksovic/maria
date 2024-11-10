import {Component, EventEmitter, Output} from '@angular/core';
import {CodeEditorComponent, CodeModel} from "@ngstack/code-editor";
import {BehaviorSubject, debounceTime} from "rxjs";

@Component({
  selector: 'app-request-body',
  standalone: true,
  imports: [CodeEditorComponent],
  templateUrl: './request-body.component.html',
  styleUrl: './request-body.component.scss'
})
export class RequestBodyComponent {

  private _requestContentChanged$: BehaviorSubject<string> = new BehaviorSubject('');
  private requestContentChanged$ = this._requestContentChanged$.asObservable();

  @Output()
  public requestBodyChanged: EventEmitter<string> = new EventEmitter<string>();

  theme = 'vs-dark';

  model: CodeModel = {
    language: 'json',
    uri: 'main.json',
    value: '{}'
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true
    }
  };

  constructor() {
    this.requestContentChanged$.pipe(debounceTime(1000)).subscribe((value) => {
      console.log('Request body changed:', value);
      this.requestBodyChanged.emit(value);
    });
  }


  onCodeChanged(value: string) {
    this._requestContentChanged$.next(value);
  }

  handleLoaded() {
    console.log('Code editor loaded');
  }
}
