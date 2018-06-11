import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkerCheckjobComponent } from './worker-checkjob.component';

const routes: Routes = [
    {
        path: '', component: WorkerCheckjobComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WorkerCheckjobRoutingModule { }