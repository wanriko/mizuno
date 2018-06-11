import { AfterViewInit, Component, Input, OnInit, ViewChild, VERSION } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/index';
import { debounceTime } from 'rxjs/operator/debounceTime';
import swal from 'sweetalert2';
import { Globals } from '../../components/globals/globals';
import { Response } from '@angular/http/src/static_response';


@Component({
  selector: 'app-job-control-header',
  templateUrl: './job-control-header.component.html',
  styleUrls: ['./job-control-header.component.scss']
})
export class JobControlHeaderComponent implements OnInit {
  today = new Date();
  Datenow = this.today.toISOString().slice(0, 10);
  
  private data_JobReport : any={};

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  DeRemain: any[];        // แสดงรายละเอียด  ข้อมูลงาน  ค้าง 
  DeSuccess: any[];       // แสดงรายละเอียด  ข้อมุลงาน  วันปัจจุบันที่เสร็จ
  DeBigJob: any[];        // แสดงรายละเอียด  ข้อมูลงาน  WAVE_BIG_JOB
  DeConsolJob: any[];     // แสดงรายละเอียด  ข้อมูลงาน  CONSOLIDATE

  hiddenDetail_Remain = true;
  hiddenDetail_Success = true;
  hiddenDetail_DeBigJob = true;
  hiddenDetail_DeConJob = true;

  constructor(
    private dataService : DataService,  
    private globals: Globals,
  ) { }

  ngOnInit():void{
    this.globals.navTitle = 'JOB CONTROL HEADER'; 
    this.globals.editMode = true;
    this.AllJOB_REPORT();
  }

   /////// TSDC_JOB_CONTROL_HEADER ------ WAVE_BIG_JOB ------- TSDC_WAVE_DETAIL : CONSOLIDATE
  AllJOB_REPORT(){
    this.dataService.Job_HEAD_BIG_CONSOL().subscribe(response =>{       
    if(response.status)
    { 
      this.data_JobReport = response.data[0];
      console.log(this.data_JobReport) 

 ////////////////// เปลี่ยนค่า NaN ให้เป็น 0  //////////////
      //////////// คำนวณเปอร์เซ็น ตารางข้อมูลงานค้าง
      this.data_JobReport.perBill_1 = (this.data_JobReport.remainBill / this.data_JobReport.allBill *100).toFixed(0) 
      this.data_JobReport.perItem_1 = (this.data_JobReport.remainItem / this.data_JobReport.allItem *100).toFixed(0) 
      this.data_JobReport.perQty_1  = (this.data_JobReport.remainQty  / this.data_JobReport.allQty *100).toFixed(0) 

      if ( this.data_JobReport.perBill_1 = Number.isNaN(this.data_JobReport.remainBill / this.data_JobReport.allBill) ){
        this.data_JobReport.perBill_1 = 0 ;
      }else if( this.data_JobReport.perBill_1 != 1 )
        { this.data_JobReport.perBill_1 = (this.data_JobReport.remainBill / this.data_JobReport.allBill *100).toFixed(0) ; }

      if ( this.data_JobReport.perItem_1  = Number.isNaN(this.data_JobReport.remainItem / this.data_JobReport.allItem) ){
        this.data_JobReport.perItem_1  = 0 ;
      }else if( this.data_JobReport.perItem_1 != 1 )
        { this.data_JobReport.perItem_1 = (this.data_JobReport.remainItem / this.data_JobReport.allItem *100).toFixed(0)  ; }

      if ( this.data_JobReport.perQty_1  = Number.isNaN(this.data_JobReport.remainQty  / this.data_JobReport.allQty) ){
        this.data_JobReport.perQty_1 = 0 ;
      }else if( this.data_JobReport.perQty_1 != 1 )
        { this.data_JobReport.perQty_1 = (this.data_JobReport.remainQty  / this.data_JobReport.allQty *100).toFixed(0)  ; }

     //////////// คำนวณเปอร์เซ็น ตารางข้อมูลปัจจุบัน ณ วันที่ Datenow
      this.data_JobReport.perBill_2 = (this.data_JobReport.FinBill / this.data_JobReport.PreBill *100 ).toFixed(0) 
      this.data_JobReport.perItem_2 = (this.data_JobReport.FinItem / this.data_JobReport.PreItem *100 ).toFixed(0) 
      this.data_JobReport.perQty_2  = (this.data_JobReport.FinQty  / this.data_JobReport.PreQty *100 ).toFixed(0) 

      if ( this.data_JobReport.perBill_2 = Number.isNaN(this.data_JobReport.FinBill / this.data_JobReport.PreBill) ){
        this.data_JobReport.perBill_2 = 0 ;
      }else if( this.data_JobReport.perBill_2 != 1 )
        { this.data_JobReport.perBill_2 = (this.data_JobReport.FinBill / this.data_JobReport.PreBill *100).toFixed(0) ; }

      if ( this.data_JobReport.perItem_2 = Number.isNaN(this.data_JobReport.FinItem / this.data_JobReport.PreItem) ){
        this.data_JobReport.perItem_2  = 0 ;
      }else if( this.data_JobReport.perItem_2 != 1 )
        { this.data_JobReport.perItem_2 = (this.data_JobReport.FinItem / this.data_JobReport.PreItem *100).toFixed(0) ; }

      if ( this.data_JobReport.perQty_2 = Number.isNaN(this.data_JobReport.FinQty  / this.data_JobReport.PreQty) ){
        this.data_JobReport.perQty_2 = 0 ;
      }else if( this.data_JobReport.perQty_2 != 1 )
        { this.data_JobReport.perQty_2 = (this.data_JobReport.FinQty  / this.data_JobReport.PreQty *100).toFixed(0) ; }


     //////////// คำนวณเปอร์เซ็น ตารางข้อมูล WAVE BIG JOB
      this.data_JobReport.perBill_3 = (this.data_JobReport.FinBillWave / this.data_JobReport.BillWave *100).toFixed(0) 
      this.data_JobReport.perItem_3 = (this.data_JobReport.finItemWave / this.data_JobReport.ItemWave *100).toFixed(0) 
      this.data_JobReport.perQty_3  = (this.data_JobReport.finQtyWave / this.data_JobReport.QtyWave *100).toFixed(0) 

      if ( this.data_JobReport.perBill_3  = Number.isNaN(this.data_JobReport.FinBillWave / this.data_JobReport.BillWave) ){
        this.data_JobReport.perBill_3 = 0 ;
      }else if( this.data_JobReport.perBill_3 != 1 )
        { this.data_JobReport.perBill_3 = (this.data_JobReport.FinBillWave / this.data_JobReport.BillWave *100).toFixed(0) ; }

      if ( this.data_JobReport.perItem_3   = Number.isNaN(this.data_JobReport.finItemWave / this.data_JobReport.ItemWave ) ){
        this.data_JobReport.perItem_3  = 0 ;
      }else if( this.data_JobReport.perItem_3 != 1 )
        { this.data_JobReport.perItem_3 = (this.data_JobReport.finItemWave / this.data_JobReport.ItemWave *100).toFixed(0) ; }

      if ( this.data_JobReport.perQty_3   = Number.isNaN(this.data_JobReport.finQtyWave / this.data_JobReport.QtyWave) ){
        this.data_JobReport.perQty_3 = 0 ;
      }else if( this.data_JobReport.perQty_3 != 1 )
        { this.data_JobReport.perQty_3 = (this.data_JobReport.finQtyWave / this.data_JobReport.QtyWave *100).toFixed(0) ; }

    ////////////// คำนวณเปอร์เซ็น ตารางข้อมูลงาน WAVE CONSOLIDATE
    this.data_JobReport.perBill_4 = (this.data_JobReport.finBillCon / this.data_JobReport.AllBillCon *100).toFixed(0) 
    this.data_JobReport.perItem_4 = (this.data_JobReport.finItemCon / this.data_JobReport.AllItemCon *100).toFixed(0) 
    this.data_JobReport.perQty_4  = (this.data_JobReport.finQTYCon / this.data_JobReport.AllQTYCon  *100).toFixed(0) 
    this.data_JobReport.perQTYPick_4  = (this.data_JobReport.finQTYPick / this.data_JobReport.AllQTYPick *100).toFixed(0) 

    if ( this.data_JobReport.perBill_4  = Number.isNaN(this.data_JobReport.finBillCon / this.data_JobReport.AllBillCon) ){
      this.data_JobReport.perBill_4 = 0 ;
    }else if( this.data_JobReport.perBill_4 != 1 )
      { this.data_JobReport.perBill_4 = (this.data_JobReport.finBillCon / this.data_JobReport.AllBillCon *100).toFixed(0) ; }

    if ( this.data_JobReport.perItem_4   = Number.isNaN(this.data_JobReport.finItemCon / this.data_JobReport.AllItemCon ) ){
      this.data_JobReport.perItem_4  = 0 ;
    }else if( this.data_JobReport.perItem_4 != 1 )
      { this.data_JobReport.perItem_4 = (this.data_JobReport.finItemCon / this.data_JobReport.AllItemCon *100).toFixed(0) ; }

    if ( this.data_JobReport.perQty_4   = Number.isNaN(this.data_JobReport.finQTYCon / this.data_JobReport.AllQTYCon ) ){
      this.data_JobReport.perQty_4 = 0 ;
    }else if( this.data_JobReport.perQty_4 != 1 )
      { this.data_JobReport.perQty_4 = (this.data_JobReport.finQTYCon / this.data_JobReport.AllQTYCon *100).toFixed(0) ; }

    if ( this.data_JobReport.perQTYPick_4   = Number.isNaN(this.data_JobReport.finQTYPick / this.data_JobReport.AllQTYPick) ){
      this.data_JobReport.perQTYPick_4 = 0 ;
    }else if( this.data_JobReport.perQTYPick_4 != 1 )
      { this.data_JobReport.perQTYPick_4 = (this.data_JobReport.finQTYPick / this.data_JobReport.AllQTYPick *100).toFixed(0) ; }

 

////////////////////// เปลี่ยนค่า null ให้เป็น 0  ///////////////////
      if( this.data_JobReport.remainItem === null || this.data_JobReport.remainQty === null )
      {
        this.data_JobReport.remainItem = 0;
        this.data_JobReport.remainQty = 0;
      }
       if( this.data_JobReport.FinItem === null || this.data_JobReport.FinQty === null ||
           this.data_JobReport.PreItem === null || this.data_JobReport.PreQty === null )
      {
        this.data_JobReport.FinItem = 0;
        this.data_JobReport.FinQty = 0;
        this.data_JobReport.PreItem = 0;
        this.data_JobReport.PreQty = 0;
      }      
       if( this.data_JobReport.finQtyWave === null )
      {
        this.data_JobReport.finQtyWave = 0;
      }
       if( this.data_JobReport.finQTYCon === null || this.data_JobReport.finQTYPick === null )
      {
        this.data_JobReport.finQTYCon = 0;
        this.data_JobReport.finQTYPick = 0;
      }  

    }
    else{ console.log('Error') }
    })
  }

  //////////////////////////////////////////////////////////////
  /////////// แสดงรายละเอียด ข้อมูลของงานค้าง 
  Detail_Remain(){
    this.dataService.Detail_RemainJob().subscribe(response => {
      this.DeRemain = response.data;
      console.log(response.data)
      this.hiddenDetail_Remain =! this.hiddenDetail_Remain ;
    })
  }

  /////////// แสดงรายละเอียด ข้อมูลงานวันปัจจุบันที่เสร็จ
  Detail_Success(){
    this.dataService.Detail_SuccessJob().subscribe(response => {
      this.DeSuccess = response.data;
      console.log(response.data)
      this.hiddenDetail_Success =! this.hiddenDetail_Success ;
    })
  }

  /////////// แสดงรายละเอียด ข้อมูลงาน WAVE_BIG_JOB ทั้งหมด
  Detail_BigJob(){
    this.dataService.Detail_WaveJob().subscribe(response => {
      this.DeBigJob = response.data;
      console.log(response.data)
      this.hiddenDetail_DeBigJob =! this.hiddenDetail_DeBigJob;
    })
  }

  /////////// แสดงรายละเอียด ข้อมูลงาน CONSOLIDATE
  Detail_ConsolJob(){
    this.dataService.Detail_ConsolJob().subscribe(response => {
      this.DeConsolJob = response.data;
      console.log(response.data)
      this.hiddenDetail_DeConJob =! this.hiddenDetail_DeConJob;
    })
  }





  //this.name_user = this.globals.user.FIRSTNAME;       //ค่าจาก login    
  //this.ตัวแปร = this.globals.user.คอลัมน์;       //ค่าจาก login  

  // ______ คอลัมน์ ______
  //       USER_ID
  //       USERNAME
  //       PASSWORD
  //       FIRSTNAME
  //       LASTNAME
  //       CATEGORY
  //       STATUS
  //       LAST_LOGIN
  //       WORKER_ID
  // FROM TEST_EMPLOYEE
}


