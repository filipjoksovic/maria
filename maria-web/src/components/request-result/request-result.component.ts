import {Component, effect, inject, model, Signal, TemplateRef, ViewChild} from '@angular/core';
import {RequestResultService} from "../../app/services/request-result.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {CodeEditorComponent, CodeModel} from "@ngstack/code-editor";
import {RequestResultModel} from "../../app/model/request/request-result.model";
import {DatePipe} from "@angular/common";
import {CdkDrag, CdkDragHandle, CdkDragMove} from "@angular/cdk/drag-drop";
import {NzResizableDirective, NzResizableModule, NzResizeEvent, NzResizeHandleComponent} from "ng-zorro-antd/resizable";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-request-result',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    CodeEditorComponent,
    DatePipe,
    CdkDrag,
    CdkDragHandle,
    NzResizableDirective,
    NzIconDirective,
    NzResizableModule
  ],
  templateUrl: './request-result.component.html',
  styleUrl: './request-result.component.scss',
  styles: [
    `
      .right-wrap {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .right {
        background: #fff;
        border: 1px solid #ddd;
        text-align: center;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
      }
    `
  ]
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

  @ViewChild("resultsContainer")
  public resultEditor: any;

  constructor() {
    effect(() => {
      this.model.value = this.requestResult()?.responseContent ?? "{}";
    });
  }

  setHeight($event: CdkDragMove<any>) {
    console.log($event);
    const element = this.resultEditor.nativeElement as HTMLElement;
    const parent = element.parentElement as HTMLElement;
    const parentY = parent.getBoundingClientRect().top;
    const parentHeight = parent.getBoundingClientRect().bottom - parentY;
    const y = $event.pointerPosition.y;
    const height = parentY + parentHeight - y - 16;
    element.style.height = height + "px";
  }


  width = 400;
  height = 200;
  id = -1;

  onResize({width, height}: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.width = width!;
      this.height = height!;
    });
  }
}
