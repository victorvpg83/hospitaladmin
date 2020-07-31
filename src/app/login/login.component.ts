import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

declare const gapi: any

declare function init_plugins()

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  formSubmitted = false
  public auth2: any

  public loginForm = this.fb.group({
    email: [ localStorage.getItem( 'email' ) || '', [ Validators.required, Validators.email ] ],
    password: [ '', Validators.required ],
    remember: [ false ]
  })

  constructor( private router: Router,
               private fb: FormBuilder,
               private userService: UserService,
               private ngZone: NgZone ) { }

  ngOnInit(): void {

    init_plugins()
    this.renderButton()

  }

  login() {

    this.userService.loginUser( this.loginForm.value )
      .subscribe( resp => {

        this.loginForm.get( 'remember' ).value ? localStorage.setItem( 'email', this.loginForm.get( 'email' ).value ) : localStorage.removeItem( 'email' )

        // Navigate to dashboard
        this.router.navigateByUrl( '/dashboard' )

      }, (err) => {
        Swal.fire( 'Error', err.error.msg, 'error' )
      })
  }

  // Google login

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });

    this.startApp()

  }

  async startApp() {

    await this.userService.googleInit()
    this.auth2 = this.userService.auth2

    this.attachSignin( document.getElementById('my-signin2') );

  };

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token

          this.userService.loginUserGoogle( id_token )
            .subscribe( resp => {
              // Navigate to dashboard
              this.ngZone.run( () => {
                this.router.navigateByUrl( '/dashboard' )
              })
            })


        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
