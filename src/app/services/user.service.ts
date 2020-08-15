import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { tap, map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { LoadUser } from '../interfaces/load-users.interface';

import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

const base_url = environment.base_url

declare const gapi: any

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any
  public user: User

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone ) {

    this.googleInit()

  }

  get token(): string {
    return localStorage.getItem( 'token' ) || ''
  }

  get uid(): string {
    return this.user.uid || ''
  }

  get role(): 'USER_ROLE' | 'ADMIN_ROLE' {
    return this.user.role
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  googleInit() {

    return new Promise( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '344177934995-suhnjvga5tscv1q01hrogci9lf9froj1.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve()
      });
    })
  }

  saveLocalStorage( token: string, menu: any ) {
    localStorage.setItem( 'token', token )
    localStorage.setItem( 'menu', JSON.stringify( menu ) )
  }

  logout() {
    localStorage.removeItem( 'token' )
    localStorage.removeItem( 'menu' )

    this.auth2.signOut().then( () => {

      this.ngZone.run( () => {
        this.router.navigateByUrl( '/login' )
      })

    });
    this.auth2.disconnect()
  }

  validateToken(): Observable<boolean> {

    return this.http.get( `${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( ( resp: any ) => {

        const { email, google, name, role, uid, img = '' } = resp.user

        this.user = new User( name, email, '', img, google, role, uid )

        this.saveLocalStorage( resp.token, resp.menu )
        return true
      }),

      catchError( error => of( false ) )
    )
  }

  createUser( formData: RegisterForm ) {

    return this.http.post( `${ base_url }/users`, formData )
                  .pipe(
                    tap( ( resp: any ) => this.saveLocalStorage( resp.token, resp.menu ) )
                  )
  }

  updateProfile( data: { name: string, email: string, role: string } ) {

    data = {
      ...data,
      role: this.user.role
    }

    return this.http.put( `${ base_url }/users/${ this.uid }`, data, this.headers)

  }

  loginUser( formData: LoginForm ) {

    return this.http.post( `${ base_url }/login`, formData )
               .pipe(
                 tap( ( resp: any ) => this.saveLocalStorage( resp.token, resp.menu ) )
               )
  }

  loginUserGoogle( token ) {

    return this.http.post( `${ base_url }/login/google`, { token } )
               .pipe(
                 tap( ( resp: any ) => this.saveLocalStorage( resp.token, resp.menu ) )
               )
  }

  loadUsers( from: number = 0 ) {

    const url = `${ base_url }/users?from=${ from }`
    return this.http.get<LoadUser>( url, this.headers )
      .pipe(
        map( resp => {
          const users = resp.users.map(
            user => new User( user.name, user.email, '', user.img, user.google, user.role, user.uid )
          )

          return {
            total: resp.total,
            users
          }
        })
      )

  }

  deleteUser( user: User ) {
    const url = `${ base_url }/users/${ user.uid }`
    return this.http.delete( url, this.headers )
  }

  saveUser( user: User ) {

    return this.http.put( `${ base_url }/users/${ user.uid }`, user, this.headers)

  }

}
