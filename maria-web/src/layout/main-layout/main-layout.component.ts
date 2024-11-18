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
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, RequestLinkComponent, NzTooltipDirective, NzButtonComponent, NzModalModule, NzDividerComponent, NzColDirective, NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent, NzInputDirective, NzRowDirective, PaginatorModule, ReactiveFormsModule],

  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  isVisibleMiddle = false;

  isCollapsed = false;

  public requests$: Signal<RequestModel[] | undefined>;

  constructor(private readonly router: Router, private readonly requestService: RequestService) {
    this.requests$ = toSignal(requestService.requests$);
  }

  handleCancelMiddle() {

  }

  handleOkMiddle() {

  }
}
