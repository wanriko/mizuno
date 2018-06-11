import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ScanJobDetailComponent } from './scan-job-detail.component';
import { ScanJobDetailRoutingModule } from './scan-job-detail.routing';

// Import ngx-barcode module
import { NgxBarcodeModule } from 'ngx-barcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ScanJobDetailRoutingModule,
    NgxBarcodeModule
  ],
  declarations: [ScanJobDetailComponent]
})
export class ScanJobDetailModule { }
