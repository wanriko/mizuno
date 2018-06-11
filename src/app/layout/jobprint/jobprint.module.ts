import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobprintComponent } from './jobprint.component';
import { JobprintRoutingModule } from './jobprint.routing';
// Import ngx-barcode module
import { NgxBarcodeModule } from 'ngx-barcode';
// Import Data-Table module
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    JobprintRoutingModule,
    NgxBarcodeModule,
    DataTablesModule,
  ],
  declarations: [JobprintComponent]
})
export class JobprintModule { }
