import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobaccComponent } from './jobacc.component';

const routes: Routes = [
    {
        path: '', component: JobaccComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class JobaccRoutingModule { }
