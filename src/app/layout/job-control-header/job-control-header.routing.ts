import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobControlHeaderComponent } from './job-control-header.component';

const routes: Routes = [
    {
        path: '', component:JobControlHeaderComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class JobControlHeaderRoutingModule { }
