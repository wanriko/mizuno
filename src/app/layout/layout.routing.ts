import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'location-master', loadChildren: './location/location.module#LocationModule' },
            { path: 'scanitem', loadChildren: './scanitem/scanitem.module#ScanitemModule' },
            { path: 'jobacc', loadChildren: './jobacc/jobacc.module#JobaccModule' },
            { path: 'jobprint', loadChildren: './jobprint/jobprint.module#JobprintModule' },
            { path: 'JobControlHeader', loadChildren: './job-control-header/job-control-header.module#JobControlHeaderModule' },
            { path: 'ScanJobDetail', loadChildren: './scan-job-detail/scan-job-detail.module#ScanJobDetailModule' },
            { path: 'StatusReport', loadChildren: './status-report/status-report.module#StatusReportModule' },
            { path: 'DeptCustomer', loadChildren: './dept-customer/dept-customer.module#DeptCustomerModule' },
            { path: 'DailyMonitor', loadChildren: './daily-monitor/daily-monitor.module#DailyMonitorModule' },
            { path: 'DailyJobMonitor', loadChildren: './daily-jobmonitor/daily-jobmonitor.module#DailyJobmonitorModule' },
            { path: 'WorkerCheckjob', loadChildren: './worker-checkjob/worker-checkjob.module#WorkerCheckjobModule' },
            { path: 'location-item', loadChildren: './location-item/location-item.module#LocationItemModule' },
            { path: 'goods-import', loadChildren: './goods-import/goods-import.module#GoodsImportModule' },
            { path: 'goods-import-keyin', loadChildren: './goods-import-keyin/goods-import-keyin.module#GoodsImportKeyinModule' },
            { path: 'receive-barcode', loadChildren: './receive-barcode/receive-barcode.module#ReceiveBarcodeModule' },
            { path: 'chkstock-inlocation', loadChildren: './chkstock-inlocation/chkstock-inlocation.module#ChkstockInlocationModule' },
            { path: 'report-job-online', loadChildren: './report-job-online/report-job-online.module#ReportJobOnlineModule' },

        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
