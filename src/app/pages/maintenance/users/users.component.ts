import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { User } from '../../../models/user.model';

import { UserService } from '../../../services/user.service';
import { SearchService } from '../../../services/search.service';
import { ImageModalService } from '../../../services/image-modal.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalUsers = 5
  public users: User[] = []
  public usersTemp: User[] = []
  public from = 0
  public loading = true
  public imgSubs: Subscription

  constructor( private userService: UserService,
               private searchService: SearchService,
               private imageModalService: ImageModalService ) { }


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
    }

  ngOnInit(): void {

    this.loadUsers()

    this.imgSubs = this.imageModalService.newImage
    .pipe( delay(100) )
    .subscribe( img => this.loadUsers() )
  }

  loadUsers() {
    this.loading = true
    this.userService.loadUsers( this.from )
      .subscribe( ({ total, users }) => {

        this.totalUsers = total
        this.users = users
        this.usersTemp = users
        this.loading = false
    })
  }

  pageChange( value: number ) {
    this.from += value

    if ( this.from < 0 ) {
      this.from = 0
    } else if ( this.from >= this.totalUsers ) {
      this.from -= value
    }

    this.loadUsers()
  }

  search( term: string ) {
    if ( term.length === 0 ) {
      return this.users = this.usersTemp
    }

    this.searchService.search( 'users', term )
    .subscribe( results => {
      this.users = results
    })
  }

  deleteUser( user: User ) {

    if ( user.uid === this.userService.uid ) {
      return Swal.fire( 'Error', 'No puedes borrarte a ti mismo', 'error' )
    }

    Swal.fire({
      title: '¿Estas seguro?',
      text: `Estas a punto de eliminar a ${ user.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {

        this.userService.deleteUser( user )
          .subscribe( resp => {
            Swal.fire(
              'Usuario borrado',
              `${ user.name } fue eliminado correctamente`,
              'success'
            )
            this.loadUsers()
          })
      }
    })
  }

  changeRole( user: User ) {
    this.userService.saveUser( user )
      .subscribe( resp => {
        console.log(resp)
      })
  }

  openModal( user: User ) {
    console.log(user)
    this.imageModalService.openModal( 'users', user.uid, user.img )
  }

}
