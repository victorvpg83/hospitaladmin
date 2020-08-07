import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PAGES_ROUTES } from './pages.routes';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphs1Component } from './graphs1/graphs1.component';
import { PagesComponent } from './pages.component';

// Temp
import { IncrementComponent } from '../components/increment/increment.component';
import { GraphdComponent } from '../components/graphd/graphd.component';

// ng2-charts
import { ChartsModule } from 'ng2-charts';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './maintenance/users/users.component';
import { ModalImageComponent } from '../components/modal-image/modal-image.component';


@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graphs1Component,
        PagesComponent,
        IncrementComponent,
        GraphdComponent,
        AccountSettingsComponent,
        PromisesComponent,
        RxjsComponent,
        ProfileComponent,
        UsersComponent,
        ModalImageComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graphs1Component,
        ModalImageComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        ReactiveFormsModule,
        FormsModule,
        ChartsModule
    ]
})

export class PagesModule { }
