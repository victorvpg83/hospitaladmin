import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  public user: User

  constructor( public sidebar: SidebarService,
               public userService: UserService ) {
    this.user = userService.user
  }

  ngOnInit(): void {
  }

}
