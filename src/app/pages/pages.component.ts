import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/shared/sidebar.service';

declare function init_plugins()


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor( private sidebarService: SidebarService ) { }

  ngOnInit(): void {
    init_plugins()
    this.sidebarService.loadMenu()
  }

}
