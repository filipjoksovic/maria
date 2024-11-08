import {Component, inject, Signal} from '@angular/core';
import {RequestResultService} from "../../app/services/request-result.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-request-result',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './request-result.component.html',
  styleUrl: './request-result.component.scss'
})
export class RequestResultComponent {
  private readonly requestResultService = inject(RequestResultService);

  public requestResult: Signal<string | undefined> = toSignal(this.requestResultService.requestResult$);
}
