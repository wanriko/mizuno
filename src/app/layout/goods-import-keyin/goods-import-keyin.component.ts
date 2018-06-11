import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { Globals } from '../../components/globals/globals';
import { DataService } from '../../services/index';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { Response } from '@angular/http/src/static_response';
import { NgxBarcodeModule } from 'ngx-barcode';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-goods-import-keyin',
  templateUrl: './goods-import-keyin.component.html',
  styleUrls: ['./goods-import-keyin.component.scss']
})
export class GoodsImportKeyinComponent implements OnInit {
  @ViewChild('input1') input_1: ElementRef;
  busy: Subscription;

  input: any = {};
  private hidden_check = true;

  show: any = [];
  
  private lock_input = false;
  
  constructor(
    private globals: Globals,
    private dataService : DataService, 
    private router : Router, 
  ) { }

  ngOnInit() {
    this.globals.navTitle = 'KEY IN GOODS IMPORT '; 
    this.globals.editMode = true;
    setTimeout(() => { this.focusInput() }, 150)
  }

  focusInput() {
    this.input_1.nativeElement.focus();
  }

  Check_Vender(){

    setTimeout(() => { this.focusInput() }, 150)

    this.busy = this.dataService.Search_BVENDER(this.input).subscribe(
      Response=>{
        console.log(Response.data)
        if( Response.data.length > 0 ){
          swal({
            title: 'มี BARCODE :' + this.input.BCODE_VENDER + ' นี้แล้ว ?',
            text: "ต้องการแก้ไขข้อมูลหรือไม่",
            type: 'warning',
            showCancelButton: true,
            backdrop:	false,
            cancelButtonColor: '#d33',
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'ยืนยัน'
          }).then((result) => {
            if (!result.value)  
              ///// มีแล้ว ยกเลิก
            {
              this.hidden_check = true;

              this.input.BCODE_VENDER = [] 
              this.input.BCODE_885 = [] 
              this.input.QTY_ = [] 
              this.input.PRICE = [] 
              this.input.PRICE_VAT = []         
            }else{   
              ///// มีแล้ว ยืนยัน
              this.hidden_check = false; 
              this.lock_input = true;

              this.input.BCODE_VENDER = Response.data[0].BARCODE_VENDER;
              this.input.BCODE_885 = Response.data[0].BCODE_885_ITM;
              this.input.QTY_ = Response.data[0].QUANTITY;
              this.input.PRICE = Response.data[0].PRICE;
              this.input.PRICE_VAT = Response.data[0].PRICE_VAT;
            }
          })
        }else if( Response.data.length == 0 )  ///// ยังไม่มี
        {
          this.hidden_check = false; 
        }
    })
  }

  KeyIn_GOODS(){
    var user = JSON.parse(localStorage.getItem('mizunoUser')); 
    this.input.CRE_BY = user.WORKER_ID;
    console.log('KeyIn_GOODS')
    console.log(this.input)

    this.busy = this.dataService.KEYIN_Goods_import(this.input).subscribe(
      Response=> {
        console.log(this.input)
        if( Response.status === 'error check'){
          swal({
            type: 'warning', 
            html: '<h4>'+'<b>' + ' ข้อมูลไม่ถูกต้อง โปรดตรวจสอบใหม่ ' + '</b>'+'</h4>',
            timer: 1300,
            showConfirmButton: false,
            backdrop:	true,
          })
        }else if(  Response.status === 'error insert' )
          {
            swal({
              type: 'warning', 
              html: '<h4>'+'<b>' + '  บันทึกข้อมูลไม่สำเร็จ ' + '</b>'+'</h4>',
              timer: 1300,
              showConfirmButton: false,
              backdrop:	true,
            })
          }else if(  Response.status === 'success insert' )
            {
              swal({
                type: 'success', 
                html: '<h4>'+'<b>' + ' บันทึกข้อมูลเสร็จสิ้น ' + '</b>'+'</h4>',
                timer: 1300,
                showConfirmButton: false,
                backdrop:	true,
              })
              this.lock_input = false;
              this.clear();
            }else if(  Response.status === 'error update' )
              {
                swal({
                  type: 'warning', 
                  html: '<h4>'+'<b>' + ' แก้ไขข้อมูลไม่สำเร็จ ' + '</b>'+'</h4>',
                  timer: 1300,
                  showConfirmButton: false,
                  backdrop:	true,
                })
              }else if(  Response.status === 'success update' )
                {
                  swal({
                    type: 'success', 
                    html: '<h4>'+'<b>' + ' แก้ไขข้อมูลเสร็จสิ้น ' + '</b>'+'</h4>',
                    timer: 1300,
                    showConfirmButton: false,
                    backdrop:	true,
                  })
                  this.lock_input = false;
                  this.clear();
                }
      })
  }




  clear(){
    this.input.BCODE_VENDER = [] 
    this.input.BCODE_885 = [] 
    this.input.QTY_ = [] 
    this.input.PRICE = [] 
    this.input.PRICE_VAT = []

    this.lock_input = false;
    setTimeout(() => { this.focusInput() }, 150)
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


}
