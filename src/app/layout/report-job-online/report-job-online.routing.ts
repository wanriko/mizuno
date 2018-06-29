import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportJobOnlineComponent } from './report-job-online.component';

const routes: Routes = [
    {
        path: '', component: ReportJobOnlineComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportJobOnlineRoutingModule { }


