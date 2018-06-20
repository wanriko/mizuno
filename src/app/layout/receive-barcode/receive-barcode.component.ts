import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { Globals } from '../../components/globals/globals';
import { DataService } from '../../services/index';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { Response } from '@angular/http/src/static_response';
import { NgxBarcodeModule } from 'ngx-barcode';

@Component({
  selector: 'app-receive-barcode',
  templateUrl: './receive-barcode.component.html',
  styleUrls: ['./receive-barcode.component.scss']
})
export class ReceiveBarcodeComponent implements OnInit {
  @ViewChild('Inputbarcode') inputbar: ElementRef;
  today = new Date();
  Datenow = this.today.toISOString().slice(0, 10);

  barcode: any = {};
  dataBar: any = {};
  show: any = [];
  private WORKER

  constructor(
    private globals: Globals,
    private dataService : DataService,  
  ) { }

  ngOnInit(): void {

    this.globals.navTitle = 'RECEIVE BARCODE'; 
    this.globals.editMode = true;
    this.barcode.Item ='UCEGAH41P04AWHF'
  }

  focusInput() {
   this.inputbar.nativeElement.focus();
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print Barcode Item</title>
          <style>

          html, body,#wrapper {
            height:100%;
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
        </tr>
        
        <tr>
        <td align="right">  Price </td>
        </tr>
      </table>

    </body>
    </html>`
    );
    popupWin.document.close();
}

ScanBar_Item(){
  var user = JSON.parse(localStorage.getItem('mizunoUser')); 
  this.dataBar.WORKER = user.WORKER_ID;

  this.dataBar.Item = this.barcode.Item;

  this.dataService.SearchItem(this.dataBar).subscribe(
    response=>{
      console.log(this.dataBar) 
      console.log(response.data) 

    if( response.status === "true") 
    {
      this.dataBar.ITEM_ID = response.data[0].ITEM_ID;
      this.dataBar.BCODE_885_ITM = response.data[0].BCODE_885_ITM;
      this.dataBar.ITEM_DESC = response.data[0].ITEM_DESC;
    }
      else 
      {  
      }
    })
  }

  CLEAR() {
      this.barcode.Item = '';
      this.focusInput();
    }



    // print(): void {
    //   let printContents, popupWin;
    //   printContents = document.getElementById('print-section').innerHTML;
    //   popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    //   popupWin.document.open();
    //   popupWin.document.write(`<html>
    //                             <head>
    //                               <title>Print Barcode Item</title>
    //                                 <style>
  
    //                                 html, body,#wrapper {
    //                                   height: 100%;
    //                                   width: 100%;
    //                                   margin: 0;
    //                                   padding: 0;
    //                                   border: 0;
    //                                 }
  
    //                               </style>
    //                             </head>
    //                           <body onload="window.print();window.close()">
  
    //                           <table id="wrapper">
    //                             <tr>
    //                               <td>  ${printContents} </td>
    //                               <td> ${printContents} </td>
    //                             </tr>   
    //                           <br>                           
    //                           </table>                       
  
    //                         </body>
    //                       </html>`
    //   );
    //   popupWin.document.close();
    // }
}

