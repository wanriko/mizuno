import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule,NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JobControlHeaderComponent } from './job-control-header.component';
import { JobControlHeaderRoutingModule} from'./job-control-header.routing';
import { DataTablesModule } from 'angular-datatables';
import { BusyModule } from 'angular2-busy';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NgbDropdownModule.forRoot(),
        JobControlHeaderRoutingModule,
        DataTablesModule,
        BusyModule,
    ],
    declarations: [JobControlHeaderComponent]
  })
  export class JobControlHeaderModule {}
  