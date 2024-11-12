import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar-header',
  templateUrl: './sidebar-header.component.html',
  styleUrls: ['./sidebar-header.component.css'],
  standalone: true,
  imports: [MatIcon, MatButton]
})
export class SidebarHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
