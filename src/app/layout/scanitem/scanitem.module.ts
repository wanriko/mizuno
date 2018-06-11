import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ScanitemComponent } from './scanitem.component';
import { ScanitemRoutingModule } from './scanitem.routing';

// Import ngx-barcode module
import { NgxBarcodeModule } from 'ngx-barcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ScanitemRoutingModule,
    NgxBarcodeModule
  ],
  declarations: [ScanitemComponent]
})
export class ScanitemModule { }
