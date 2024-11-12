import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CodeEditorComponent, CodeModel} from "@ngstack/code-editor";
import {BehaviorSubject, debounceTime, skip} from "rxjs";

@Component({
  selector: 'app-request-body',
  standalone: true,
  imports: [CodeEditorComponent],
  templateUrl: './request-body.component.html',
  styleUrl: './request-body.component.scss'
})
export class RequestBodyComponent implements OnInit {

  private _requestContentChanged$: BehaviorSubject<string> = new BehaviorSubject('');
  private requestContentChanged$ = this._requestContentChanged$.asObservable();

  @Output()
  public requestBodyChanged: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  public body: string = "{}";

  theme = 'vs-light';

  model!: CodeModel;

  options = {
    contextmenu: true,
    minimap: {
      enabled: false
    }
  };

  constructor() {
    this.requestContentChanged$.pipe(skip(1), debounceTime(1000)).subscribe((value) => { //TODO figure out a way to remove skip()
      console.log('Request body changed:', value);
      this.requestBodyChanged.emit(value);
    });
  }

  public ngOnInit() {
    let parsedBody = "";

    try {
      parsedBody = JSON.stringify(JSON.parse(this.body), null, "\t");
    } catch (e) {
      parsedBody = this.body;
      console.error('Failed to parse JSON:', e);
    }

    this.model = {
      language: 'json',
      uri: 'main.json',
      value: parsedBody
    };
  }

  onCodeChanged(value: string) {
    this._requestContentChanged$.next(value);
  }

  handleLoaded() {
    console.log('Code editor loaded');
  }
}
