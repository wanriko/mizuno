import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyMonitorComponent } from './daily-monitor.component';

const routes: Routes = [
    {
        path: '', component: DailyMonitorComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DailyMonitorRoutingModule { }


