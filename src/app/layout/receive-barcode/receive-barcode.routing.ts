import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceiveBarcodeComponent } from './receive-barcode.component';

const routes: Routes = [
    {
        path: '', component: ReceiveBarcodeComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class  ReceiveBarcodeRoutingModule { }