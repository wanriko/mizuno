import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { DeptCustomerComponent } from './dept-customer.component';
import { DeptCustomerRoutingModule } from './dept-customer.routing';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

// Import ngx-barcode module
import { NgxBarcodeModule } from 'ngx-barcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    DeptCustomerRoutingModule,
    NgxBarcodeModule,
    Ng2AutoCompleteModule,
  ],
  declarations: [DeptCustomerComponent]
})
export class DeptCustomerModule { }
