import { RouterModule, Routes } from '@angular/router';


import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphs1Component } from './graphs1/graphs1.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'progress', component: ProgressComponent },
          { path: 'graphs1', component: Graphs1Component },
          { path: '', pathMatch: 'full', redirectTo: '/dashboard' },

        ]
      }
]

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes )
