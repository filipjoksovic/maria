import { Component, OnInit, Signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { SidebarHeaderComponent } from "./sidebar-header/sidebar-header/sidebar-header.component";
import { MatSidenav, MatSidenavContainer, MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { RequestService } from '../../../app/services/request.service';
import { Observable } from 'rxjs';
import { RequestModel } from '../../../app/model/request.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { RequestLinkComponent } from '../../request-link/request-link.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [MatIcon, MatButton, SidebarHeaderComponent, MatSidenavModule, RouterModule, RequestLinkComponent]
})
export class SidebarComponent implements OnInit {


  public requests$: Signal<RequestModel[] | undefined>;

  constructor(private readonly router: Router, private readonly requestService: RequestService) {
    this.requests$ = toSignal(requestService.requests$);
  }



  ngOnInit() {
  }

  handleNewRequestClick() {
    this.requestService.handleNewRequest();
  }

  handleRequestDelete(requestId: string) {
    this.requestService.handleRequestDelete(requestId);
  }

}
