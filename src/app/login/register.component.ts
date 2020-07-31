import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent {

  formSubmitted = false

  public registerForm = this.fb.group({
    name: [ 'Victor', Validators.required ],
    email: [ 'victor@victor.com', [ Validators.required, Validators.email ] ],
    password: [ '123456', Validators.required ],
    password2: [ '123456', Validators.required ],
    terms: [ true, Validators.required ]
  }, {
    validators: this.equalPasswords( 'password', 'password2' )
  })

  constructor( private fb: FormBuilder,
               private userService: UserService,
               private router: Router ) { }

  createUser() {
    this.formSubmitted = true
    console.log( this.registerForm.value )

    if ( this.registerForm.invalid ) { return }

    // Create user
    this.userService.createUser( this.registerForm.value )
      .subscribe( response => {
        // Navigate to dashboard
        this.router.navigateByUrl( '/dashboard' )
      }, (err) => {
        Swal.fire( 'Error', err.error.msg, 'error' )
      } )

  }

  noValidField( field: string ): boolean {
    return this.registerForm.get(field).invalid && this.formSubmitted ? true : false
  }

  invalidPasswords() {
    const pass1 = this.registerForm.get('password').value
    const pass2 = this.registerForm.get('password2').value

    return pass1 !== pass2 && this.formSubmitted ? true : false

  }

  aceptTerms() {
    return !this.registerForm.get('terms').value && this.formSubmitted
  }

  equalPasswords( pass1Name: string, pass2Name: string ) {

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get( pass1Name )
      const pass2Control = formGroup.get( pass2Name )

      pass1Control.value === pass2Control.value ? pass2Control.setErrors(null) : pass2Control.setErrors({ notEqual: true })

    }

  }

}
