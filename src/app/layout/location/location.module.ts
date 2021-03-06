import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule,NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocationComponent } from './location.component';
import { LocationRoutingModule} from'./location-routing';
import { DataTablesModule } from 'angular-datatables';
import { BusyModule } from 'angular2-busy';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NgbDropdownModule.forRoot(),
        LocationRoutingModule,
        DataTablesModule,
        BusyModule,
    ],
    declarations: [LocationComponent]
  })
  export class LocationModule {}
  