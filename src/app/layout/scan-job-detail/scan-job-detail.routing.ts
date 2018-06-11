import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScanJobDetailComponent } from './scan-job-detail.component';

const routes: Routes = [
    {
        path: '', component: ScanJobDetailComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScanJobDetailRoutingModule { }