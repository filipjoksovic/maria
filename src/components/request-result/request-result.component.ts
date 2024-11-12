import {Component, effect, inject, model, Signal} from '@angular/core';
import {RequestResultService} from "../../app/services/request-result.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {CodeEditorComponent, CodeModel} from "@ngstack/code-editor";
import {RequestResultModel} from "../../app/model/request/request-result.model";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-request-result',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    CodeEditorComponent,
    DatePipe
  ],
  templateUrl: './request-result.component.html',
  styleUrl: './request-result.component.scss'
})
export class RequestResultComponent {
  public model: CodeModel = {
    language: 'json',
    uri: 'main.json',
    value: "{}"
  };

  public options = {
    contextmenu: true,
    minimap: {
      enabled: false
    },
    readOnly: true
  };

  private readonly requestResultService = inject(RequestResultService);

  public requestResult: Signal<RequestResultModel | undefined> = toSignal(this.requestResultService.requestResult$);

  constructor() {
    effect(() => {
      this.model.value = this.requestResult()?.responseContent ?? "{}";
    });
  }
}
