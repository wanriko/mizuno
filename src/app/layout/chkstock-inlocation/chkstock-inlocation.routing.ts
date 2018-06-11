import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChkstockInlocationComponent } from './chkstock-inlocation.component';

const routes: Routes = [
    {
        path: '', component: ChkstockInlocationComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChkstockInlocationRoutingModule { }


