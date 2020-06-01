import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graphs1Component } from './pages/graphs1/graphs1.component';
import { Page404Component } from './shared/page404/page404.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'graphs1', component: Graphs1Component },
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' },

    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
