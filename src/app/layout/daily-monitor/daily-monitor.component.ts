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
      this.dataJob.BillPer_a = (this.dataJob.Complete_BillPer / this.dataJob.All_BillPer *100).toFixed(0) //////
      if ( this.dataJob.BillPer_a = Number.isNaN( this.dataJob.Complete_BillPer / this.dataJob.All_BillPer ) ){
        this.dataJob.BillPer_a = 0 ;
      }else { this.dataJob.BillPer_a = (this.dataJob.Complete_BillPer / this.dataJob.All_BillPer *100).toFixed(0) ; }

      //////
      this.dataJob.ItemPer_a = (this.dataJob.Complete_ItemPer / this.dataJob.All_ItemPer *100).toFixed(0) //////
      if ( this.dataJob.ItemPer_a = Number.isNaN( this.dataJob.Complete_ItemPer / this.dataJob.All_ItemPer ) ){
        this.dataJob.ItemPer_a = 0 ;
      }else { this.dataJob.ItemPer_a = (this.dataJob.Complete_ItemPer / this.dataJob.All_ItemPer *100).toFixed(0) ; }

      //////
      this.dataJob.QtyPer_a = (this.dataJob.Complete_QtyPer / this.dataJob.All_QtyPer *100).toFixed(0) //////
      if ( this.dataJob.QtyPer_a = Number.isNaN( this.dataJob.Complete_QtyPer / this.dataJob.All_QtyPer ) ){
        this.dataJob.QtyPer_a = 0 ;
      }else { this.dataJob.QtyPer_a = (this.dataJob.Complete_QtyPer / this.dataJob.All_QtyPer *100).toFixed(0) ; }

      ////////////// คำนวณเปอร์เซ็น CASHSALE /// notToday
      //////
      this.dataJob.BillCash_a = (this.dataJob.Complete_BillCash / this.dataJob.All_BillCash *100).toFixed(0) //////
      if ( this.dataJob.BillCash_a = Number.isNaN( this.dataJob.Complete_BillCash / this.dataJob.All_BillCash ) ){
        this.dataJob.BillCash_a = 0 ;
      }else { this.dataJob.BillCash_a = (this.dataJob.Complete_BillCash / this.dataJob.All_BillCash *100).toFixed(0) ; }

      //////
      this.dataJob.ItemCash_a = (this.dataJob.Complete_ItemCash / this.dataJob.All_ItemCash *100).toFixed(0) //////
      if ( this.dataJob.ItemCash_a = Number.isNaN( this.dataJob.Complete_ItemCash / this.dataJob.All_ItemCash ) ){
        this.dataJob.ItemCash_a = 0 ;
      }else { this.dataJob.ItemCash_a = (this.dataJob.Complete_ItemCash / this.dataJob.All_ItemCash *100).toFixed(0) ; }

      //////
      this.dataJob.QtyCash_a = (this.dataJob.Complete_QtyCash / this.dataJob.All_QtyCash *100).toFixed(0) //////
      if ( this.dataJob.QtyCash_a = Number.isNaN( this.dataJob.Complete_QtyCash / this.dataJob.All_QtyCash ) ){
        this.dataJob.QtyCash_a = 0 ;
      }else { this.dataJob.QtyCash_a = (this.dataJob.Complete_QtyCash / this.dataJob.All_QtyCash *100).toFixed(0) ; }

      ////////////// คำนวณเปอร์เซ็น Sorter /// notToday
      //////
      this.dataJob.ItemSort_a = (this.dataJob.Complete_ItemSort / this.dataJob.All_ItemSort *100).toFixed(0) //////
      if ( this.dataJob.ItemSort_a = Number.isNaN( this.dataJob.Complete_ItemSort / this.dataJob.All_ItemSort ) ){
        this.dataJob.ItemSort_a = 0 ;
      }else { this.dataJob.ItemSort_a = (this.dataJob.Complete_ItemSort / this.dataJob.All_ItemSort *100).toFixed(0) ; }

      //////
      this.dataJob.QtySort_a = (this.dataJob.Complete_QtySort / this.dataJob.All_QtySort *100).toFixed(0) //////
      if ( this.dataJob.QtySort_a = Number.isNaN( this.dataJob.Complete_QtySort / this.dataJob.All_QtySort ) ){
        this.dataJob.QtySort_a = 0 ;
      }else { this.dataJob.QtySort_a = (this.dataJob.Complete_QtySort / this.dataJob.All_QtySort *100).toFixed(0) ; }

      ////////////// คำนวณเปอร์เซ็น WAVE CONSOLIDATE /// notToday
      //////
      this.dataJob.BillConsol_a = (this.dataJob.Complete_BillConsol / this.dataJob.All_BillConsol *100).toFixed(0) //////
      if ( this.dataJob.BillConsol_a = Number.isNaN( this.dataJob.Complete_BillConsol / this.dataJob.All_BillConsol ) ){
        this.dataJob.BillConsol_a = 0 ;
      }else { this.dataJob.BillConsol_a = (this.dataJob.Complete_BillConsol / this.dataJob.All_BillConsol *100).toFixed(0) ; }

      //////
      this.dataJob.ItemConsol_a = (this.dataJob.Complete_ItemConsol / this.dataJob.All_ItemConsol *100).toFixed(0) //////
      if ( this.dataJob.ItemConsol_a = Number.isNaN( this.dataJob.Complete_ItemConsol / this.dataJob.All_ItemConsol ) ){
        this.dataJob.ItemConsol_a = 0 ;
      }else { this.dataJob.ItemConsol_a = (this.dataJob.Complete_ItemConsol / this.dataJob.All_ItemConsol *100).toFixed(0) ; }

      //////
      this.dataJob.QtyConsol_a = (this.dataJob.Complete_QtyConsol / this.dataJob.All_QtyConsol *100).toFixed(0) //////
      if ( this.dataJob.QtyConsol_a = Number.isNaN( this.dataJob.Complete_QtyConsol / this.dataJob.All_QtyConsol ) ){
        this.dataJob.QtyConsol_a = 0 ;
      }else { this.dataJob.QtyConsol_a = (this.dataJob.Complete_QtyConsol / this.dataJob.All_QtyConsol *100).toFixed(0) ; }

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
      this.dataJob.BillPer_b = (this.dataJob.CComplete_BillPer / this.dataJob.AAll_BillPer *100).toFixed(0) //////
      if ( this.dataJob.BillPer_b = Number.isNaN( this.dataJob.CComplete_BillPer / this.dataJob.AAll_BillPer ) ){
        this.dataJob.BillPer_b = 0 ;
      }else { this.dataJob.BillPer_b = (this.dataJob.CComplete_BillPer / this.dataJob.AAll_BillPer *100).toFixed(0) ; }

      //////
      this.dataJob.ItemPer_b = (this.dataJob.CComplete_ItemPer / this.dataJob.AAll_ItemPer *100).toFixed(0) //////
      if ( this.dataJob.ItemPer_b = Number.isNaN( this.dataJob.CComplete_ItemPer / this.dataJob.AAll_ItemPer ) ){
        this.dataJob.ItemPer_b = 0 ;
      }else { this.dataJob.ItemPer_b = (this.dataJob.CComplete_ItemPer / this.dataJob.AAll_ItemPer *100).toFixed(0) ; }

      //////
      this.dataJob.QtyPer_b = (this.dataJob.CComplete_QtyPer / this.dataJob.AAll_QtyPer *100).toFixed(0) //////
      if ( this.dataJob.QtyPer_b = Number.isNaN( this.dataJob.CComplete_QtyPer / this.dataJob.AAll_QtyPer ) ){
        this.dataJob.QtyPer_b = 0 ;
      }else { this.dataJob.QtyPer_b = (this.dataJob.CComplete_QtyPer / this.dataJob.AAll_QtyPer *100).toFixed(0) ; }

      ////////////// คำนวณเปอร์เซ็น CASHSALE /// Today
      //////
      this.dataJob.BillCash_b = (this.dataJob.CComplete_BillCash / this.dataJob.AAll_BillCash *100).toFixed(0) //////
      if ( this.dataJob.BillCash_b = Number.isNaN( this.dataJob.CComplete_BillCash / this.dataJob.AAll_BillCash ) ){
        this.dataJob.BillCash_b = 0 ;
      }else { this.dataJob.BillCash_b = (this.dataJob.CComplete_BillCash / this.dataJob.AAll_BillCash *100).toFixed(0) ; }

      //////
      this.dataJob.ItemCash_b = (this.dataJob.CComplete_ItemCash / this.dataJob.AAll_ItemCash *100).toFixed(0) //////
      if ( this.dataJob.ItemCash_b = Number.isNaN( this.dataJob.CComplete_ItemCash / this.dataJob.AAll_ItemCash ) ){
        this.dataJob.ItemCash_b = 0 ;
      }else { this.dataJob.ItemCash_b = (this.dataJob.CComplete_ItemCash / this.dataJob.AAll_ItemCash *100).toFixed(0) ; }

      //////
      this.dataJob.QtyCash_b = (this.dataJob.CComplete_QtyCash / this.dataJob.AAll_QtyCash *100).toFixed(0) //////
      if ( this.dataJob.QtyCash_b = Number.isNaN( this.dataJob.CComplete_QtyCash / this.dataJob.AAll_QtyCash ) ){
        this.dataJob.QtyCash_b = 0 ;
      }else { this.dataJob.QtyCash_b = (this.dataJob.CComplete_QtyCash / this.dataJob.AAll_QtyCash *100).toFixed(0) ; }

      ////////////// คำนวณเปอร์เซ็น Sorter /// Today
      //////
      this.dataJob.ItemSort_b = (this.dataJob.CComplete_ItemSort / this.dataJob.AAll_ItemSort *100).toFixed(0) //////
      if ( this.dataJob.ItemSort_b = Number.isNaN( this.dataJob.CComplete_ItemSort / this.dataJob.AAll_ItemSort ) ){
        this.dataJob.ItemSort_b = 0 ;
      }else { this.dataJob.ItemSort_b = (this.dataJob.CComplete_ItemSort / this.dataJob.AAll_ItemSort *100).toFixed(0) ; }

      //////
      this.dataJob.QtySort_b = (this.dataJob.CComplete_QtySort / this.dataJob.AAll_QtySort *100).toFixed(0) //////
      if ( this.dataJob.QtySort_b = Number.isNaN( this.dataJob.CComplete_QtySort / this.dataJob.AAll_QtySort ) ){
        this.dataJob.QtySort_b = 0 ;
      }else { this.dataJob.QtySort_b = (this.dataJob.CComplete_QtySort / this.dataJob.AAll_QtySort *100).toFixed(0) ; }

      ////////////// คำนวณเปอร์เซ็น WAVE CONSOLIDATE /// Today
      //////
      this.dataJob.BillConsol_b = (this.dataJob.CComplete_BillConsol / this.dataJob.AAll_BillConsol *100).toFixed(0) //////
      if ( this.dataJob.BillConsol_b = Number.isNaN( this.dataJob.CComplete_BillConsol / this.dataJob.AAll_BillConsol ) ){
        this.dataJob.BillConsol_b = 0 ;
      }else { this.dataJob.BillConsol_b = (this.dataJob.CComplete_BillConsol / this.dataJob.AAll_BillConsol *100).toFixed(0) ; }

      //////
      this.dataJob.ItemConsol_b = (this.dataJob.CComplete_ItemConsol / this.dataJob.AAll_ItemConsol *100).toFixed(0) //////
      if ( this.dataJob.ItemConsol_b = Number.isNaN( this.dataJob.CComplete_ItemConsol / this.dataJob.AAll_ItemConsol ) ){
        this.dataJob.ItemConsol_b = 0 ;
      }else { this.dataJob.ItemConsol_b = (this.dataJob.CComplete_ItemConsol / this.dataJob.AAll_ItemConsol *100).toFixed(0) ; }

      //////
      this.dataJob.QtyConsol_b = (this.dataJob.CComplete_QtyConsol / this.dataJob.AAll_QtyConsol *100).toFixed(0) //////
      if ( this.dataJob.QtyConsol_b = Number.isNaN( this.dataJob.CComplete_QtyConsol / this.dataJob.AAll_QtyConsol ) ){
        this.dataJob.QtyConsol_b = 0 ;
      }else { this.dataJob.QtyConsol_b = (this.dataJob.CComplete_QtyConsol / this.dataJob.AAll_QtyConsol *100).toFixed(0) ; }

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
      


      ////////////////////*x*x*x*x*x*x*x*x*x*x*x*x*x*x*x* ONLINE *x*x*x*x*x*x*x*x*x*x*x*x*x*x*x*////////////////////
      ////////////// คำนวณเปอร์เซ็น LAZADA /// not Today
      ////
      this.dataJob.PO_LAZADA = (this.dataJob.PO_FinnotToday / this.dataJob.PO_AllnotToday *100).toFixed(0) //////
      if ( this.dataJob.PO_LAZADA = Number.isNaN( this.dataJob.PO_FinnotToday / this.dataJob.PO_AllnotToday ) ){
        this.dataJob.PO_LAZADA = 0 ;
      }else { this.dataJob.PO_LAZADA = (this.dataJob.PO_FinnotToday / this.dataJob.PO_AllnotToday *100).toFixed(0) ; }

      //////
      this.dataJob.ItemLAZADA = (this.dataJob.ITEM_FinnotToday / this.dataJob.ITEM_AllnotToday *100).toFixed(0) //////
      if ( this.dataJob.ItemLAZADA = Number.isNaN( this.dataJob.ITEM_FinnotToday / this.dataJob.ITEM_AllnotToday ) ){
        this.dataJob.ItemLAZADA = 0 ;
      }else { this.dataJob.ItemLAZADA = (this.dataJob.ITEM_FinnotToday / this.dataJob.ITEM_AllnotToday *100).toFixed(0) ; }


      ////////////// คำนวณเปอร์เซ็น LAZADA /// Today
      //// 
      this.dataJob.PO_LAZADA_Today = (this.dataJob.PO_FinToday / this.dataJob.PO_AllToday *100).toFixed(0) //////
      if ( this.dataJob.PO_LAZADA_Today = Number.isNaN( this.dataJob.PO_FinToday / this.dataJob.PO_AllToday ) ){
        this.dataJob.PO_LAZADA_Today = 0 ;
      }else { this.dataJob.PO_LAZADA_Today = (this.dataJob.PO_FinToday / this.dataJob.PO_AllToday *100).toFixed(0) ; }

      //////
      this.dataJob.ItemLAZADA_Today = (this.dataJob.ITEM_FinToday / this.dataJob.ITEM_AllToday *100).toFixed(0) //////
      if ( this.dataJob.ItemLAZADA_Today = Number.isNaN( this.dataJob.ITEM_FinToday / this.dataJob.ITEM_AllToday ) ){
        this.dataJob.ItemLAZADA_Today = 0 ;
      }else { this.dataJob.ItemLAZADA_Today = (this.dataJob.ITEM_FinToday / this.dataJob.ITEM_AllToday *100).toFixed(0) ; }


      }    
      else{ console.log('Error') }
    })
  }

  // Detail_online(){
  //   this.dataService.
  // }



}

