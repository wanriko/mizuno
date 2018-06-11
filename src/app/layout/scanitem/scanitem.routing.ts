import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScanitemComponent } from './scanitem.component';

const routes: Routes = [
    {
        path: '', component: ScanitemComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScanitemRoutingModule { }