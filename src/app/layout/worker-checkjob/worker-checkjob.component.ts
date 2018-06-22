import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { Globals } from '../../components/globals/globals';
import { DataService } from '../../services/index';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { Response } from '@angular/http/src/static_response';
import { Router } from '@angular/router';
import { Console } from '@angular/core/src/console';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-worker-checkjob',
  templateUrl: './worker-checkjob.component.html',
  styleUrls: ['./worker-checkjob.component.scss']
})
export class WorkerCheckjobComponent implements OnInit {
  @ViewChild('InputbarcodeJob') inputJob: ElementRef;
  @ViewChild('InputbarcodeItem') inputItem: ElementRef;
  @ViewChild('QTYcheck') inputQTY: ElementRef;

  busy: Subscription;
  
  today = new Date();
  Datenow = this.today.toISOString().slice(0, 10);

  barcode: any = {};
  input: any = {};
  private WORKER

  private hiddenScanJOB_NO = false;
  private hiddenScanITEM_ID = true;
  private hiddenShowData = true;

  show: any = [];
 
  constructor(
    private globals: Globals,
    private dataService : DataService,  
    private router : Router,
  ) { }

  ngOnInit() {
    this.Page_scanWave();
    this.globals.navTitle = 'WAVE ACCEPT'; 
    this.globals.editMode = true;
  }

  focusInput() {
    if ( this.hiddenScanJOB_NO === false )
    {
      this.inputJob.nativeElement.focus();
    }
    else if( this.hiddenScanITEM_ID === false )
    {
      this.inputItem.nativeElement.focus();
    }
    else if(this.hiddenShowData === false )
    {
      this.inputQTY.nativeElement.focus();
    }
  }

  goHome() { 
    swal({ 
      title: 'ต้องการจบงานใช่หรือไม่ ?', 
      type: 'warning', 
      showCancelButton: true, 
      confirmButtonClass: 'btn btn-success', 
      cancelButtonClass: 'btn btn-danger', 
      confirmButtonText: 'ยืนยัน', 
      cancelButtonText: 'ยกเลิก' 
    }).then((result) => { 
      if (result.value) { 
        this.globals.ShowTable(); 
        this.globals.editMode = false; 
        this.router.navigate(['/pack']); 
      } 
    }) 
  }

  goScanWave() { 
    this.Page_scanWave();
    this.barcode = {};
  }

  Page_scanWave(){
    this.focusInput();
    this.hiddenScanJOB_NO = false;
    this.hiddenScanITEM_ID = true;
    this.hiddenShowData = true;
    setTimeout(() => { this.focusInput() }, 100)
  }

  Page_scanItem(){
    this.focusInput();
    this.hiddenScanITEM_ID = false;
    this.hiddenScanJOB_NO = true;
    this.hiddenShowData = true;
    setTimeout(() => { this.focusInput() }, 100)
  }

  // var user = JSON.parse(localStorage.getItem('mizunoUser'));     //ค่าจาก login ของเอ ที่เก็บค่าไว้จากตอนที่ login เข้าระบบ 
  // this.users.USER_CREATE = user.WORKER_ID;

  Check_BillWave(){
    var user = JSON.parse(localStorage.getItem('mizunoUser')); 
    this.input.WORKER = user.WORKER_ID;

    this.input.WAVE= this.barcode.WAVE;
    this.input.BCODE= this.barcode.BCODE;
    ///////////////// Check Bill
    this.busy = this.dataService.Bill_Service(this.input).subscribe(
      response=>{
        this.input.WORKER = user.WORKER_ID;
        this.input.BCODE= this.barcode.BCODE;  
        console.log(response.data.length)

        var filt_a = response.data.filter( function(element){
          return element.TEND_TIME == "haveEnd" && element.TEND_CHECK_TIME == "defaultCheck"
        });

        var filt_b = response.data.filter( function(element){
          return element.TEND_TIME == "defaultEnd" && element.TEND_CHECK_TIME == "haveCheck"
        });

      ///////////////// Check Bill + item 
      if( response.data.length > 0 ) 
      {
        this.show.countItem = response.data[0].countItem;
        this.show.countItemCheck = response.data[0].countItemCheck;
        if( filt_a != 0 )
        {
          this.Page_scanItem()
        }
        else if( filt_b.length == 0 )
        {
          swal({
            type: 'warning', 
            html: '<h4>'+'<b>' + ' Job นี้ตรวจสอบเสร็จไปแล้ว ' + '</b>'+'</h4>',
            timer: 1000,
            showConfirmButton: false,
            backdrop:	true,
          })
            this.barcode = {};
        }
      }
      else if( response.data.length == 0 )
      {  
        this.show = [];
        swal({
          type: 'warning', 
          html: '<h4>'+'<b>' + ' ไม่พบเลขที่ Job นี้ ' + '</b>'+'</h4>',
          timer: 1000,
          showConfirmButton: false,
          backdrop:	true,
        })
        this.input.WAVE= this.barcode.WAVE;
        this.Page_scanWave(); 
        this.barcode = {};
      }
    })
  }

  Check_Bill_Item(){
    var user = JSON.parse(localStorage.getItem('mizunoUser')); 
    this.input.WORKER = user.WORKER_ID;
    
    this.input.WAVE= this.barcode.WAVE;
    this.input.BCODE= this.barcode.BCODE;
    ///////////////// Check Bill + item
    this.Page_scanItem();
    this.busy = this.dataService.Bill_Item_Service(this.input).subscribe(
      response=>{
        console.log(response.data)
        this.input.WORKER = user.WORKER_ID;

        //----------------------------------------Select แล้วมีค่า
        if( response.data.length > 0) {
          if( response.data[0].EEND_TIME == "haveEnd"){      //-------ค่าเป็น haveEnd
            if(response.data[0].EEND_CHECK_TIME == "defaultCheck")
            {
              this.input.ITEM_ID = response.data[0].ITEM_ID;
              this.input.QTY = response.data[0].QTY;
              this.input.QTY_CHECK = response.data[0].QTY_CHECK;
              this.input.BILL_NO = response.data[0].BILL_NO;
              this.input.WAVE= this.barcode.WAVE;
              this.busy = this.dataService.Upd_WorkerTCheck(this.input).subscribe(
                response=>{
                  if(response.status === 'true'){ 
                    this.hiddenShowData = false;
                    this.hiddenScanITEM_ID = true;
                    this.hiddenScanJOB_NO = true;
                    // console.log(response)
                    this.barcode.QTY_CHK = this.input.QTY
                    setTimeout(() => { this.focusInput() }, 100)
                  }
                }
              )
            }
            else if(response.data[0].EEND_CHECK_TIME == "haveCheck")
            {
              swal({
                type: 'warning', 
                html: '<h4>'+'<b>' + ' Item นี้ ถูกตรวจสอบไปแล้ว ' + '</b>'+'</h4>',
                timer: 1000,
                showConfirmButton: false,
                backdrop:	true,
              })
              this.barcode.BCODE = '';  
            }
          }     //-------จบบบบบบบ haveEnd      

        if( response.data[0].EEND_TIME == "defaultEnd" && response.data[0].EEND_CHECK_TIME == "defaultCheck" )
        {           //-------จบบบบบบบ defaultEnd           
          swal({
            type: 'warning', 
            html: '<h4>'+'<b>' + ' Item นี้ ยังจัดสินค้าไม่เสร็จ ' + '</b>'+'</h4>',
            timer: 1000,
            showConfirmButton: false,
            backdrop:	true,
          })
          this.Page_scanItem();
          this.barcode.BCODE = '';                     
        }
      }
      //----------------------------------------Select แล้วไม่มีค่าออกมา
      else if( response.data.length == 0 ){
        swal({
          type: 'error', 
          html: '<h4>'+'<b>' + ' ไม่พบ Item นี้ในงานที่ทำ ' + '</b>'+'</h4>',
          timer: 1000,
          showConfirmButton: false,
          backdrop:	true,
        })
        this.barcode.BCODE = '';
        this.input.WAVE= this.barcode.WAVE;
        this.Page_scanItem(); 
      }
    })  
  }              

  Update_QtyEnd(){
    this.input.QTY_CHK = this.barcode.QTY_CHK 
    this.input.WAVE= this.barcode.WAVE;
    this.busy = this.dataService.Upd_EndCheck(this.input).subscribe(
      response=>{
        if(response.status === 'true'){         
          this.input.WAVE= this.barcode.WAVE;
          // console.log(response)
          if( this.input.QTY_CHK != this.input.QTY ){
            swal({
              type: 'warning', 
              html: '<h5>'+'<b>' + ' จำนวน QTY CHECK ไม่ตรงกับ จำนวน QTY ต้องการทำรายการต่อหรือไม่ ?' + '</b>'+'</h5>',
              showConfirmButton: true,
              showCancelButton: true, 
              backdrop:	true,
              confirmButtonClass: 'btn btn-success', 
              cancelButtonClass: 'btn btn-danger', 
              confirmButtonText: 'ยืนยัน', 
              cancelButtonText: 'ยกเลิก' 
            }).then((result) => { 
              if (result.value) { 
                swal({
                  type: 'success', 
                  html: '<h4>'+'<b>' + ' บันทึกข้อมูลเรียบร้อยแล้ว ' + '</b>'+'</h4>',
                  timer: 1000,
                  showConfirmButton: false,
                  backdrop:	true,
                })
                this.Page_scanItem();
                this.barcode.BCODE = '';   
                // this.barcode = {};
                // this.input = {};

              }
            })
          }else if( this.input.QTY_CHK = this.input.QTY ){
              swal({
                type: 'success', 
                html: '<h4>'+'<b>' + ' บันทึกข้อมูลเรียบร้อยแล้ว ' + '</b>'+'</h4>',
                timer: 1000,
                showConfirmButton: false,
                backdrop:	true,
              })
              this.Page_scanItem();
              this.barcode.BCODE = '';   
              // this.barcode = {};
              // this.input = {};

          }
        }else if(response.status === 'false'){
          this.input.WAVE= this.barcode.WAVE;
          swal({
            type: 'warning', 
            html: '<h4>'+'<b>' + 'Item นี้ ถูกตรวจสอบไปแล้ว 2' + '</b>'+'</h4>', 
            timer: 1000,
            showConfirmButton: false,
            backdrop:	true,
          })
        }

        this.input.WAVE= this.barcode.WAVE;
        var user = JSON.parse(localStorage.getItem('mizunoUser')); 
        this.input.WORKER = user.WORKER_ID;
        this.input.BCODE= this.barcode.BCODE;
        // console.log(this.input)

        this.busy = this.dataService.Bill_Service(this.input).subscribe(
          response=>{       

            this.show.countItem = response.data[0].countItem;
            this.show.countItemCheck = response.data[0].countItemCheck; 

            var filt_c = response.data.filter( function(element){
              return element.TEND_CHECK_TIME == "defaultCheck"
            });

            if(response.status === 'true') {
              if( filt_c == 0 )
              {
                this.Page_scanWave();
                this.barcode.WAVE = '';
                this.barcode.BCODE = '';  

                swal({
                  type: 'success', 
                  html: '<h4><b> ตรวจสอบเสร็จสิ้น </b></h4>',
                  timer: 1000,
                  showConfirmButton: false,
                  backdrop:	true,
                })
 
              }else if( filt_c > 0 ){         
                swal({
                  type: 'success', 
                  html: '<h4><b>  ต่อๆ </b></h4>',
                  timer: 1000,
                  showConfirmButton: false,
                  backdrop:	true,
                })             
              }
              this.barcode.BCODE = '';
            }
          })

      }

    )
  }






  // ======================= CLEAR ข้อมูล =======================
  // CLEAR() {
  //   this.barcode.QTY_CHK = '';
  //   this.focusInput();
  // }

  //this.name_user = this.globals.user.WORKER_ID;       //ค่าจาก login    
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

