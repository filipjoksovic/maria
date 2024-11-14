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
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";
import {NzButtonComponent} from "ng-zorro-antd/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, RequestLinkComponent, NzTooltipDirective, NzButtonComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


}
