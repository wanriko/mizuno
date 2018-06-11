import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {DailyMonitorComponent } from './daily-monitor.component';
import {DailyMonitorRoutingModule } from './daily-monitor.routing';

// Import ngx-barcode module
import { NgxBarcodeModule } from 'ngx-barcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    DailyMonitorRoutingModule,
    NgxBarcodeModule
  ],
  declarations: [DailyMonitorComponent]
})
export class DailyMonitorModule { }
