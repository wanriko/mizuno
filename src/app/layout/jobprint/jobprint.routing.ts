import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobprintComponent } from './jobprint.component';

const routes: Routes = [
    {
        path: '', component: JobprintComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class JobprintRoutingModule { }