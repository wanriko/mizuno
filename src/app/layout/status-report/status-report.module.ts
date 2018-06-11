import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { StatusReportComponent } from './status-report.component';
import { StatusReportRoutingModule } from './status-report.routing';
import { DataTablesModule } from 'angular-datatables';
import { NgbDropdownModule,NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Import ngx-barcode module
import { NgxBarcodeModule } from 'ngx-barcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    StatusReportRoutingModule,
    NgxBarcodeModule,
    DataTablesModule,
    
  ],
  declarations: [StatusReportComponent]
})
export class StatusReportModule { }
