import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { GoodsImportKeyinComponent } from './goods-import-keyin.component';
import { GoodsImportKeyinRoutingModule } from './goods-import-keyin.routing';
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
    GoodsImportKeyinRoutingModule,
    NgxBarcodeModule,
    DataTablesModule,
    BusyModule,
    
  ],
  declarations: [GoodsImportKeyinComponent]   
})
export class GoodsImportKeyinModule { }
