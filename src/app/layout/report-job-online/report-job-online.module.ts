import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReportJobOnlineComponent } from './report-job-online.component';
import { ReportJobOnlineRoutingModule } from './report-job-online.routing';
import { DataTablesModule } from 'angular-datatables';

// Import ngx-barcode module
import { NgxBarcodeModule } from 'ngx-barcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ReportJobOnlineRoutingModule,
    NgxBarcodeModule,
    DataTablesModule,
  ],
  declarations: [ReportJobOnlineComponent]
})
export class ReportJobOnlineModule { }
