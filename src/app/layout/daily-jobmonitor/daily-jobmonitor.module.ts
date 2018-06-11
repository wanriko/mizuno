import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {DailyJobmonitorComponent } from './daily-jobmonitor.component';
import {DailyJobmonitorRoutingModule } from './daily-jobmonitor.routing';

// Import ngx-barcode module
import { NgxBarcodeModule } from 'ngx-barcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    DailyJobmonitorRoutingModule,
    NgxBarcodeModule
  ],
  declarations: [DailyJobmonitorComponent]
})
export class DailyJobmonitorModule { }
