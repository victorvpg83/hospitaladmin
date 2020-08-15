import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = []

  loadMenu() {
    this.menu = JSON.parse( localStorage.getItem( 'menu' ) ) || []
  }

  // menu: any = [
  //   {
  //     title: 'Principal',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       { title: 'Dashboard', url: '/dashboard' },
  //       { title: 'Progress', url: '/progress' },
  //       { title: 'Gráficas', url: '/graphs1' },
  //       { title: 'Promesas', url: '/promises' },
  //       { title: 'RXJS', url: '/rxjs' }
  //     ]
  //   },

  //   {
  //     title: 'Mantenimiento',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { title: 'Usuarios', url: '/users' },
  //       { title: 'Hospitales', url: '/hospitals' },
  //       { title: 'Doctores', url: '/doctors' }
  //     ]
  //   }
  // ]
}
