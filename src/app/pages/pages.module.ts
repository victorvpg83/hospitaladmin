import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms'
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


@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graphs1Component,
        PagesComponent,
        IncrementComponent,
        GraphdComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graphs1Component,
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ]
})

export class PagesModule { }
