import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyJobmonitorComponent } from './/daily-jobmonitor.component';

const routes: Routes = [
    {
        path: '', component: DailyJobmonitorComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DailyJobmonitorRoutingModule { }


