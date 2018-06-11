import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { GoodsImportComponent } from './goods-import.component';
import { GoodsImportRoutingModule } from './goods-import.routing';
import { DataTablesModule } from 'angular-datatables';
import { NgbDropdownModule,NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Import ngx-barcode module
import { NgxBarcodeModule } from 'ngx-barcode';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { BusyModule } from 'angular2-busy';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    GoodsImportRoutingModule,
    NgxBarcodeModule,
    DataTablesModule,
    BusyModule,
    
  ],
  declarations: [GoodsImportComponent]   
})
export class GoodsImportModule { }
