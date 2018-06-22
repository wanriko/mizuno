import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import swal from 'sweetalert2';
import { Globals } from '../../components/globals/globals';
import { DataService } from '../../services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-daily-monitor',
  templateUrl: './daily-monitor.component.html',
  styleUrls: ['./daily-monitor.component.scss']
})
export class DailyMonitorComponent implements OnInit {

  private dataJob : any={};
  private dataOnline : any[];   // เอาไปใช้ใน ngFor
  hidden_DataAll = false;
  hidden_DataOnline = true;

  constructor(
    private dataService : DataService,  
    private globals: Globals,
  ) { }

  ngOnInit() {
    this.Fn_DailyMonitor();
    this.globals.navTitle = 'DailyMonitor'; 
    this.globals.editMode = true;
    setInterval(() => this.Fn_DailyMonitor(), 55000)
  }

  today = new Date();
  Datenow = this.today.toISOString().slice(0, 10);

  Fn_DailyMonitor(){
    this.dataService.Service_DailyMonitor().subscribe(response =>{       
      if(response.status)
      { 
        this.dataJob = response.data[0];
        console.log(this.dataJob) 

  ////////////////////============================== notToday ==============================////////////////////
      ////////////// คำนวณเปอร์เซ็น PER ORDER /// notToday
      //////
      // this.dataJob.BillPer_a = (this.dataJob.Complete_BillPer / this.dataJob.All_BillPer *100).toFixed(0) //////
      // if ( this.dataJob.BillPer_a = Number.isNaN( this.dataJob.Complete_BillPer / this.dataJob.All_BillPer ) ){
      //   this.dataJob.BillPer_a = 0 ;
      // }else { this.dataJob.BillPer_a = (this.dataJob.Complete_BillPer / this.dataJob.All_BillPer *100).toFixed(0) ; }

      ////////////// คำนวณเปอร์เซ็น TOTAL /// notToday
      //////TOTAL BILL
      this.dataJob.TotalBILL_notToday = ( this.dataJob.All_BillPer + this.dataJob.All_BillCash + this.dataJob.All_BillConsol);
      //////
      this.dataJob.TTotalBILL_notToday = ( this.dataJob.Complete_BillPer + this.dataJob.Complete_BillCash + this.dataJob.Complete_BillConsol);
      
      //////
      this.dataJob.BILL_notToday = (this.dataJob.TTotalBILL_notToday / this.dataJob.TotalBILL_notToday *100).toFixed(0) //////
      if ( this.dataJob.BILL_notToday = Number.isNaN( this.dataJob.TTotalBILL_notToday / this.dataJob.TotalBILL_notToday ) ){
        this.dataJob.BILL_notToday = 0 ;
      }else { this.dataJob.BILL_notToday = (this.dataJob.TTotalBILL_notToday / this.dataJob.TotalBILL_notToday *100).toFixed(0) ; }

      /////TOTAL SKU
      this.dataJob.TotalSKU_notToday = ( this.dataJob.All_ItemPer + this.dataJob.All_ItemCash + this.dataJob.All_ItemSort + this.dataJob.All_ItemConsol);
      //////
      this.dataJob.TTotalSKU_notToday = ( this.dataJob.Complete_ItemPer + this.dataJob.Complete_ItemCash + this.dataJob.Complete_ItemSort + this.dataJob.Complete_ItemConsol );

      //////
      this.dataJob.SKU_notToday = (this.dataJob.TTotalSKU_notToday / this.dataJob.TotalSKU_notToday *100).toFixed(0) //////
      if ( this.dataJob.SKU_notToday = Number.isNaN( this.dataJob.TTotalSKU_notToday / this.dataJob.TotalSKU_notToday ) ){
        this.dataJob.SKU_notToday = 0 ;
      }else { this.dataJob.SKU_notToday = (this.dataJob.TTotalSKU_notToday / this.dataJob.TotalSKU_notToday *100).toFixed(0) ; }

      /////TOTAL QUANTITY
      this.dataJob.TotalQTY_notToday = ( this.dataJob.All_QtyPer + this.dataJob.All_QtyCash + this.dataJob.All_QtySort + this.dataJob.All_QtyConsol);
      //////
      this.dataJob.TTotalQTY_notToday = ( this.dataJob.Complete_QtyPer + this.dataJob.Complete_QtyCash + this.dataJob.Complete_QtySort + this.dataJob.Complete_QtyConsol);
      
      //////
      this.dataJob.QTY_notToday = (this.dataJob.TTotalQTY_notToday / this.dataJob.TotalQTY_notToday *100).toFixed(0) //////
      if ( this.dataJob.QTY_notToday = Number.isNaN( this.dataJob.TTotalQTY_notToday / this.dataJob.TotalQTY_notToday ) ){
        this.dataJob.QTY_notToday = 0 ;
      }else { this.dataJob.QTY_notToday = (this.dataJob.TTotalQTY_notToday / this.dataJob.TotalQTY_notToday *100).toFixed(0) ; }


      ////////////////////,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, Today ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,////////////////////
      ////////////// คำนวณเปอร์เซ็น PER ORDER /// Today
      //////
      // this.dataJob.BillPer_b = (this.dataJob.CComplete_BillPer / this.dataJob.AAll_BillPer *100).toFixed(0) //////
      // if ( this.dataJob.BillPer_b = Number.isNaN( this.dataJob.CComplete_BillPer / this.dataJob.AAll_BillPer ) ){
      //   this.dataJob.BillPer_b = 0 ;
      // }else { this.dataJob.BillPer_b = (this.dataJob.CComplete_BillPer / this.dataJob.AAll_BillPer *100).toFixed(0) ; }

      ////////////// คำนวณเปอร์เซ็น TOTAL /// Today
      ////// TOTAL BILL
      this.dataJob.TotalBILL_Today = ( this.dataJob.AAll_BillPer + this.dataJob.AAll_BillCash + this.dataJob.AAll_BillConsol );
      
      //////BILL
      this.dataJob.TTotalBILL_Today = ( this.dataJob.CComplete_BillPer + this.dataJob.CComplete_BillCash + this.dataJob.CComplete_BillConsol );    
      
      //////BILL
      this.dataJob.BILL_Today = (this.dataJob.TTotalBILL_Today / this.dataJob.TotalBILL_Today *100).toFixed(0) //////
      if ( this.dataJob.BILL_Today = Number.isNaN( this.dataJob.TTotalBILL_Today / this.dataJob.TotalBILL_Today ) ){
        this.dataJob.BILL_Today = 0 ;
      }else { this.dataJob.BILL_Today = (this.dataJob.TTotalBILL_Today / this.dataJob.TotalBILL_Today *100).toFixed(0) ; }

      ////////////// คำนวณเปอร์เซ็น TOTAL /// Today
      ////// TOTAL SKU
      this.dataJob.TotalSKU_Today = ( this.dataJob.AAll_ItemPer + this.dataJob.AAll_ItemCash + this.dataJob.AAll_ItemSort + this.dataJob.AAll_ItemConsol );

      ////// SKU
      this.dataJob.TTotalSKU_Today = ( this.dataJob.CComplete_ItemPer + this.dataJob.CComplete_ItemCash + this.dataJob.CComplete_ItemSort + this.dataJob.CComplete_ItemConsol);    
      //////SKU
      this.dataJob.SKU_Today = (this.dataJob.TTotalSKU_Today / this.dataJob.TotalSKU_Today *100).toFixed(0) //////
      if ( this.dataJob.SKU_Today = Number.isNaN( this.dataJob.TTotalSKU_Today / this.dataJob.TotalSKU_Today ) ){
      this.dataJob.SKU_Today = 0 ;
      }else { this.dataJob.SKU_Today = (this.dataJob.TTotalSKU_Today / this.dataJob.TotalSKU_Today *100).toFixed(0) ; }

      ////////////// คำนวณเปอร์เซ็น TOTAL /// Today
      //////TOTAL QUANTITY
      this.dataJob.TotalQTY_Today = ( this.dataJob.AAll_QtyPer + this.dataJob.AAll_QtyCash + this.dataJob.AAll_QtySort + this.dataJob.AAll_QtyConsol);

      //////QUANTITY
      this.dataJob.TTotalQTY_Today = ( this.dataJob.CComplete_QtyPer + this.dataJob.CComplete_QtyCash + this.dataJob.CComplete_QtySort + this.dataJob.CComplete_QtyConsol);    
      //////QUANTITY
      this.dataJob.QTY_Today = (this.dataJob.TTotalQTY_Today / this.dataJob.TotalQTY_Today *100).toFixed(0) //////
      if ( this.dataJob.QTY_Today = Number.isNaN( this.dataJob.TTotalQTY_Today / this.dataJob.TotalQTY_Today ) ){
      this.dataJob.QTY_Today = 0 ;
      }else { this.dataJob.QTY_Today = (this.dataJob.TTotalQTY_Today / this.dataJob.TotalQTY_Today *100).toFixed(0) ; }
      
      }    
      else{ console.log('Error') }
    })
  }

    calculatePercent(current:number, total:number)
    {
      if (total == 0) return total
      if (!total) return total = 0
        return ((current/total)*100).toFixed(0)
    }

    Detail_online(){
      this.dataService.Service_dataOnline().subscribe(response => { 
        if(response.status)
        { 
          this.hidden_DataOnline = false;
          this.hidden_DataAll = true;
          this.dataOnline = response.data;
          console.log( this.dataOnline )
        }    
        else{ console.log('Error') }  
      });
    }

    BACK(){
      this.hidden_DataOnline = true;
      this.hidden_DataAll = false;
    }
  
  
  
  
  
  



}

