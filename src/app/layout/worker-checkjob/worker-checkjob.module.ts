import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { WorkerCheckjobComponent } from './worker-checkjob.component';
import { WorkerCheckjobRoutingModule } from './worker-checkjob.routing';
// Import ngx-barcode module
import { NgxBarcodeModule } from 'ngx-barcode';
import { BusyModule } from 'angular2-busy';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    WorkerCheckjobRoutingModule,
    NgxBarcodeModule,
    BusyModule,
  ],
  declarations: [WorkerCheckjobComponent]
})
export class WorkerCheckjobModule { }
