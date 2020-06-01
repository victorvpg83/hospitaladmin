import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './shared/page404/page404.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graphs1Component } from './pages/graphs1/graphs1.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Page404Component,
    DashboardComponent,
    ProgressComponent,
    Graphs1Component,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    PagesComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
