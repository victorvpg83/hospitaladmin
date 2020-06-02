import { NgModule } from '@angular/core';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { Page404Component } from './page404/page404.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
    declarations: [
        BreadcrumbsComponent,
        HeaderComponent,
        Page404Component,
        SidebarComponent
    ],
    exports: [
        BreadcrumbsComponent,
        HeaderComponent,
        Page404Component,
        SidebarComponent
    ]
})

export class SharedModule { }
