import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsImportComponent } from './goods-import.component';

const routes: Routes = [
    {
        path: '', component: GoodsImportComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GoodsImportRoutingModule { }