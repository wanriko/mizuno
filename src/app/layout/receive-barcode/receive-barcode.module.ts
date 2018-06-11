import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReceiveBarcodeComponent } from './receive-barcode.component';
import { ReceiveBarcodeRoutingModule } from './receive-barcode.routing';
import { DataTablesModule } from 'angular-datatables';
import { NgbDropdownModule,NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Import ngx-barcode module
import { NgxBarcodeModule } from 'ngx-barcode';
import { importExpr } from '@angular/compiler/src/output/output_ast';

 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ReceiveBarcodeRoutingModule,
    NgxBarcodeModule,
    DataTablesModule,
    
  ],
  declarations: [ReceiveBarcodeComponent]    
})
export class  ReceiveBarcodeModule { }
