import {Component, Signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {RequestModel} from "./model/request.model";
import {RequestService} from "./services/request.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {RequestLinkComponent} from "../components/request-link/request-link.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, RequestLinkComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;

  public requests$: Signal<RequestModel[] | undefined>;

  constructor(private readonly router: Router, private readonly requestService: RequestService) {
    this.requests$ = toSignal(requestService.requests$);
  }

}
