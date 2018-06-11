import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { Globals } from '../../components/globals/globals';
import { DataService } from '../../services/index';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-scan-job-detail',
  templateUrl: './scan-job-detail.component.html',
  styleUrls: ['./scan-job-detail.component.scss']
})
export class ScanJobDetailComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    dtable : boolean = false;
    
  @ViewChild('Inputbarcode') inputBar: ElementRef;
  barcode: any = {};
  private detail_Status
  // private details
  private name_user

  private bill_no
  private bill_n8
  private bill_date
  private cust_name
  private worker
  private job_status

  private hiddenDetail = true;

  constructor(
    private globals: Globals,
    private dataService : DataService,  
  ) { }

  ngOnInit() {
    this.globals.navTitle = 'SCAN JOB DETAIL'; 
    this.globals.editMode = true;
    this.detail_Status = [];
    // this.details = [];
    this.focusInput();
  }

  focusInput() {
      setTimeout(() => 
      {
        this.inputBar.nativeElement.focus();
      }, 100); 
  }

// =========================== หา 'BILL_NO' จาก 'barcode' ===========================
  searchBill(){
    this.dataService.SearchBill_No(this.barcode).subscribe(
      response => {
        console.log(response.status);
        if (response.status === 'false'){
          swal({
            type: 'warning', 
            html: '<h4>'+'<b>' + 'ไม่พบ BILL NO : ' + this.barcode.BILL_NO + ' ที่กรอก!' + '</b>'+'</h4>',
            showConfirmButton: true,
            timer: 5000
          })
          this.barcode.BILL_NO = '';
          this.CLEAR();
        }
        else if(response.status === 'true'){
          if(response.data[0].START_JOB_TIME == '1900-01-01T00:00:00.000Z' &&
             response.data[0].END_JOB_TIME == '1900-01-01T00:00:00.000Z')
            {
              this.job_status = 'ยังไม่ถูกจัด'            
              this.showData();
            }
            else if(response.data[0].START_JOB_TIME != '1900-01-01T00:00:00.000Z' &&
                    response.data[0].END_JOB_TIME == '1900-01-01T00:00:00.000Z')
            {
              this.job_status = 'อยู่ในระหว่างการจัด'            
              this.showData();
            } 
          else
            {
              this.job_status = 'จัดสินค้าเสร็จแล้ว'
              this.showData();
            }          
        }
      })
  }

// ============================== แสดงข้อมูล ==============================
  showData(){
    this.name_user = this.globals.user.FIRSTNAME;   //ค่าจาก login a    
    console.log( this.name_user);
    this.dataService.SearchBill_No(this.barcode).subscribe( 
      response=> {
        if(response.status) {  
            this.barcode.BILL_NO = '';
            this.hiddenDetail = false;
            this.detail_Status = response.data;
            // this.details = response.data[0];
            this.bill_no = response.data[0].BILL_NO;
            this.bill_n8 = response.data[0].BILL_N8;
            this.bill_date = response.data[0].BILL_DATE;
            this.cust_name = response.data[0].CUST_NAME;
            this.worker = response.data[0].WORKER_ID;
          } 
        else {  
          swal({
            type: 'warning',
            title: 'ไม่พบ Bill NO ที่กรอก!',
            showConfirmButton: false,
            timer: 2000
          })
        } 
    });
  }

// ======================= CLEAR ข้อมูล =======================
  CLEAR() {
    this.barcode.BILL_NO = '';
    this.focusInput();
    this.hiddenDetail = true; 
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
