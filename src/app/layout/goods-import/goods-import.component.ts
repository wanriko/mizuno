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
  selector: 'app-goods-import',
  templateUrl: './goods-import.component.html',
  styleUrls: ['./goods-import.component.scss']
})
export class GoodsImportComponent implements OnInit {
  @ViewChild('input1') input_1: ElementRef;
  @ViewChild('input2') input_2: ElementRef;
  busy: Subscription;
  input: any = {};
  barcode: any = {};
  priceee: any = {};

  private Page1 = false;
  private Page2 = true;

  //private DataforShow
  private show_itemId
  private show_bcodeVender
  private show_bcode885
  private show_itemDesc
  
  private show_qty
  private show_qtyCheck

  private show_price 
  private show_priceVat 

  private priced
  private pricedVat

  constructor(
    private globals: Globals,
    private dataService : DataService, 
    private router : Router, 
  ) { }

  ngOnInit(): void  {
    this.globals.navTitle = 'GOODS IMPORT'; 
    this.globals.editMode = true;
   // this.barcode.bar_Vender = '2222222222222222222222222';
    this.Page1 = false;
    setTimeout(() => { this.focusInput() }, 150)
  }

  focusInput() {
    if ( this.Page1 === false )
    {
      this.input_1.nativeElement.focus();
    }
    else if( this.Page2 === false )
    {
      this.input_2.nativeElement.focus();
    }
  }

  // #wrapper td {
  //   vertical-align: middle;
  //   text-align: center;
  // }

  // #wrapper th {
  //   vertical-align: middle;
  // }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`<html>
                              <head>
                                <title>Print Barcode Item</title>
                                  <style>

                                  html, body,#wrapper {
                                    height: 100%;
                                    width: 100%;
                                    margin: 0;
                                    padding: 0;
                                    border: 0;
                                  }

                                  #wrapper td {
                                    vertical-align: middle;
                                    text-align: center;
                                  }
                                
                                  #wrapper th {
                                    vertical-align: middle;
                                  }

                                </style>
                              </head>
                            <body onload="window.print();window.close()">

                            <table id="wrapper">
                              <tr>
                                <td>  ${printContents} </td>
                                <td> ${printContents} </td>
                              </tr>   
                            <br>                           
                            </table>                       

                          </body>
                        </html>`
    );
    popupWin.document.close();
  }

  check_BcodeVender(){
    var user = JSON.parse(localStorage.getItem('mizunoUser')); 
    this.input.WORKER = user.WORKER_ID;
    this.input.BCODEVENDER = this.barcode.bar_Vender;

    setTimeout(() => { this.focusInput() }, 200)

    if(!this.input.BCODEVENDER) return;
    this.busy = this.dataService.Serv_BarVender(this.input).subscribe(
      response=>{
        this.input.WORKER = user.WORKER_ID;
        if( response.data.length > 0)
        {    
          this.show_itemId = response.data[0].ITEM_ID;
          this.show_bcodeVender = response.data[0].BARCODE_VENDER;
          this.show_bcode885 = response.data[0].BCODE_885_ITM;
          this.show_itemDesc = response.data[0].ITEM_DESC;

          this.show_qty = response.data[0].QUANTITY;
          this.show_qtyCheck = response.data[0].QUANTITY_CHECK;

          this.show_price = response.data[0].PRICE;
          this.show_priceVat = response.data[0].PRICE_VAT;
          
          this.Page1 = true;
          this.Page2 = false;
        }
        else
        {
          swal({ 
            type: 'warning', 
            title: 'ไม่พบบาร์โค้ดสินค้าที่กรอก!',
            html: '<h4>'+'<b>' + ' กรุณาตรวจสอบใหม่ ' + '</b>'+'</h4>',
            timer: 900,
            showConfirmButton: false,
            backdrop:	true,
          })
          this.barcode.bar_Vender = []
        }
      }
    )
  }
    
  InputPriced(){
    console.log("1")
    if(!this.priceee.price || !this.priceee.priceVat) return;

      this.priced = this.priceee.price;
      this.pricedVat = this.priceee.priceVat;
      this.barcode.showB885 = this.show_bcode885 

      this.Page1 = true;
      this.Page2 = false;
      //debugger
  }

  backto1(){
    this.Page1 = false;
    this.Page2 = true;
    this.barcode.bar_Vender = []
    setTimeout(() => { this.focusInput() }, 200)
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
