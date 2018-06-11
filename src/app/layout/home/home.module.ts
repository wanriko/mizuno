import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing'

import { StatModule } from './stat/stat.module';

import { SidebarComponent } from './../components/index';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        HomeRoutingModule,
        StatModule
    ],
    declarations: [
        HomeComponent,
        SidebarComponent,
    ]
})
export class HomeModule { }