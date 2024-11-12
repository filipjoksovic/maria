import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/shared/sidebar/sidebar.component';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarHeaderComponent } from '../../components/shared/sidebar/sidebar-header/sidebar-header/sidebar-header.component';

@Component({
  selector: 'app-home.page',
  templateUrl: './home.page.component.html',
  styleUrl: './home.page.component.scss',
  standalone: true,
  imports: [SidebarComponent, RouterModule, MatSidenavModule, SidebarHeaderComponent
  ]
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
