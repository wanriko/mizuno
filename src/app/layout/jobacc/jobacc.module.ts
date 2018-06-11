import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobaccComponent } from './jobacc.component';
import { JobaccRoutingModule } from './jobacc.routing';

@NgModule({
  imports: [
    CommonModule,
    JobaccRoutingModule,
  ],
  declarations: [JobaccComponent]
})
export class JobaccModule { }
