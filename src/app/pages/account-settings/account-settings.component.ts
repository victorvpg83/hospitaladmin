import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( // tslint:disable-next-line: variable-name
               public _settings: SettingsService ) { }

  ngOnInit(): void {
    this.lockCheck()
  }

  changeTheme( theme: string, link: any ) {

    this.applyCheck( link )

    this._settings.applyTheme( theme )

  }

  applyCheck( link: any ) {
    const selectors: any = document.getElementsByClassName( 'selector' )
    for ( const ref of selectors ) {
      ref.classList.remove( 'working' )
    }
    link.classList.add('working')
  }

  lockCheck() {

    const selectors: any = document.getElementsByClassName( 'selector' )

    const theme = this._settings.settings.theme

    for ( const ref of selectors ) {
      if ( ref.getAttribute( 'data-theme' ) === theme ) {
        ref.classList.add('working')
        break
      }
    }

  }


}
