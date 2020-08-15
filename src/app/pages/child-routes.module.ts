import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphs1Component } from './graphs1/graphs1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

// Maintenance
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { DoctorComponent } from './maintenance/doctors/doctor.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../guards/admin.guard';
import { PAGES_ROUTES } from './pages.routes';

const childRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
  { path: 'graphs1', component: Graphs1Component, data: { title: 'Graphs' } },
  { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes tema' } },
  { path: 'search/:term', component: SearchComponent, data: { title: 'Buscar' } },
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },

  // Maintenance
  { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitales' } },
  { path: 'doctors', component: DoctorsComponent, data: { title: 'Doctores' } },
  { path: 'doctor/:id', component: DoctorComponent, data: { title: 'Doctor' } },

  // Admin routes
  { path: 'users', canActivate: [ AdminGuard ], component: UsersComponent, data: { title: 'Usuarios' } },
]



@NgModule({
  declarations: [],
  imports: [ PAGES_ROUTES ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
