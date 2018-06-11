import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { Globals } from '../../components/globals/globals';
import { DataService } from '../../services/index';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-status-report',
  templateUrl: './status-report.component.html',
  styleUrls: ['./status-report.component.scss'],
})
export class StatusReportComponent implements OnInit {
  @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();

  today = new Date();
  Datenow = this.today.toISOString().slice(0, 10);

  mode = null; 
  private detail_Remain
  private count_sumRemain:any={};

  private detail_Doing
  private count_sumDoing:any={};

  private detail_Complete
  private count_sumComplete:any={};

  private hiddenDetail = true;
  private hiddenRemain= true;
  private hiddenDoing= true;
  private hiddenComplete= true;
  
  constructor(
    private globals: Globals,
    private dataService : DataService,  
  ) { 
  }

  ngOnInit(): void  {
    this.globals.navTitle = 'STATUS REPORT'; 
    this.globals.editMode = true;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10 };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  // rerender(): void {
  //     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //         // Destroy the table first
  //         dtInstance.destroy();
  //         // Call the dtTrigger to rerender again
  //         this.dtTrigger.next();
  //     });
  // }

  modeSwitch(mode) {      
    switch(mode) 
    {      
      case 'Remain':
        this.mode = 'Remain';
        this.Report();
        this.hiddenDetail = false;
        this.hiddenRemain= false;//
        this.hiddenDoing= true;
        this.hiddenComplete= true;
        break;

      case 'Doing':
        this.mode = 'Doing';
        this.Report();
        this.hiddenDetail = false;
        this.hiddenRemain= true;
        this.hiddenDoing= false;  //
        this.hiddenComplete= true;
        break;

      case 'Complete':
        this.mode = 'Complete';
        this.Report();
        this.hiddenDetail = false;
        this.hiddenRemain= true;
        this.hiddenDoing= true;  
        this.hiddenComplete= false; //
        break;
    }
  }

  Report(){
    if(this.mode == 'Remain'){
      this.dataService.status_Remain().subscribe(
        response => {
          this.count_sumRemain.countBill = response.data[0].countBill;
          this.count_sumRemain.sumItem = response.data[0].sumItem;
          this.count_sumRemain.sumQty = response.data[0].sumQty;
          console.log(this.detail_Remain)
          this.detail_Remain = response.data;
        }
      )
    }
    else if(this.mode == 'Doing'){
      this.dataService.status_Doing().subscribe(
        response => {
          this.detail_Doing = response.data;
          this.count_sumDoing.countBill = response.data[0].countBill;
          this.count_sumDoing.sumItem = response.data[0].sumItem;
          this.count_sumDoing.sumQty = response.data[0].sumQty;
        }
      )
    }
    else if(this.mode == 'Complete'){
      this.dataService.status_Complete().subscribe(
        response => {
          this.detail_Complete = response.data;
          this.count_sumComplete.countBill = response.data[0].countBill;
          this.count_sumComplete.sumItem = response.data[0].sumItem;
          this.count_sumComplete.sumQty = response.data[0].sumQty;
        }
      )
    }
  }







}
