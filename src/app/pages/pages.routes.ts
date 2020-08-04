import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphs1Component } from './graphs1/graphs1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
          { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
          { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
          { path: 'graphs1', component: Graphs1Component, data: { title: 'Graphs' } },
          { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
          { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
          { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },
          { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes tema' } },
          { path: '', pathMatch: 'full', redirectTo: '/dashboard' },

        ]
      }
]

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes )
