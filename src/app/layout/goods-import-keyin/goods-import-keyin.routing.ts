import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsImportKeyinComponent } from './goods-import-keyin.component';

const routes: Routes = [
    {
        path: '', component: GoodsImportKeyinComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GoodsImportKeyinRoutingModule { }