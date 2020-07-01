import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Progress', url: '/progress' },
        { title: 'Gráficas', url: '/graphs1' },
        { title: 'Promesas', url: '/promises' },
        { title: 'RXJS', url: '/rxjs' }
      ]
    }
  ]

  constructor() { }
}
