import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {ChkstockInlocationComponent } from './chkstock-inlocation.component';
import {ChkstockInlocationRoutingModule } from './chkstock-inlocation.routing';
import { BusyModule } from 'angular2-busy';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ChkstockInlocationRoutingModule,
    BusyModule,
  ],
  declarations: [ChkstockInlocationComponent]
})
export class ChkstockInlocationModule { }
