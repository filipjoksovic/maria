import {Component, Signal} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {
  NzContentComponent,
  NzHeaderComponent,
  NzLayoutComponent,
  NzLayoutModule,
  NzSiderComponent
} from "ng-zorro-antd/layout";
import {NzIconDirective, NzIconModule} from "ng-zorro-antd/icon";
import {NzMenuDirective, NzMenuItemComponent, NzMenuModule, NzSubMenuComponent} from "ng-zorro-antd/menu";
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";
import {RequestLinkComponent} from "../../components/request-link/request-link.component";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {RequestModel} from "../../app/model/request.model";
import {RequestService} from "../../app/services/request.service";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, RequestLinkComponent, NzTooltipDirective, NzButtonComponent],

  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  isCollapsed = false;

  public requests$: Signal<RequestModel[] | undefined>;

  constructor(private readonly router: Router, private readonly requestService: RequestService) {
    this.requests$ = toSignal(requestService.requests$);
  }
}
