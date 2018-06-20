import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { Globals } from '../../components/globals/globals';
import { DataService } from '../../services/index';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chkstock-inlocation',
  templateUrl: './chkstock-inlocation.component.html',
  styleUrls: ['./chkstock-inlocation.component.scss']
})
export class ChkstockInlocationComponent implements OnInit {
  @ViewChild('input1') input_1: ElementRef;
  @ViewChild('input2') input_2: ElementRef;

  private Page1 = false;
  private Page2 = true;
  private Page3 = true;

  busy: Subscription;
  input: any = {};
  barcode: any = {};
  private Data_forShow

  forfind : any = {};
  private Data_forUpdate
  private update : any = {}
  private qty
  private oldQty

  private location
  private itemid 
  private itemdesc

  constructor(
    private globals: Globals,
    private dataService : DataService,  
    private router : Router,
  ) { }

  ngOnInit() {
    this.globals.navTitle = 'CHECK LOCATION'; 
    this.globals.editMode = true;
    setTimeout(() => { this.focusInput() }, 200)
  }

  check_Location(){
    var user = JSON.parse(localStorage.getItem('mizunoUser')); 
    this.input.WORKER = user.WORKER_ID;
    this.input.LOCATION = this.barcode.LOCAT;

    setTimeout(() => { this.focusInput() }, 150)

    if(!this.input.LOCATION) return;

    this.busy = this.dataService.ServiceLocation_Id(this.input).subscribe(
      response=>{
        this.input.WORKER = user.WORKER_ID;
        if( response.data.length > 0)
        {
          this.Page1 = false;
          this.Page2 = false;
          this.Page3 = true;
          setTimeout(() => { this.focusInput() }, 150)

          this.Data_forShow = response.data;
          console.log(response.data)
        }
        else
        {
          swal({ 
            type: 'warning', 
            html: '<h4>'+'<b>' + ' ไม่พบ LOCATION ที่ต้องการค้นหา ' + '</b>'+'</h4>',
            timer: 900,
            showConfirmButton: false,
            backdrop:	true,
          })
          this.barcode.LOCAT = []
        }
      }  
    )}

    findforUpdate(LOCATION){
      this.Page1 = true;
      this.Page2 = true;
      this.Page3 = false;
      setTimeout(() => { this.focusInput() }, 150)

      var forfind = {LOCATION};
      //console.log(forfind)

      this.busy = this.dataService.ServiceLocation_Id(forfind).subscribe(
        response=>{
          if( response.data.length > 0)
          {   
            this.Data_forUpdate = response.data;
            this.qty = response.data[0].QUANTITY;
            this.oldQty = response.data[0].QUANTITY;

            // this.location = response.data[0].LOCATION_ID;  
            // this.itemid = response.data[0].ITEM_ID;  
            // this.itemdesc = response.data[0].ITEM_DESC;  
          }
      })
    }

    Update_qty(location,itemId,qty){
      this.Page1 = true;
      this.Page2 = true;
      this.Page3 = false;
      console.log()

      this.update.QUANTITY = qty;
      this.update.LOCATION = location;
      this.update.ITEM_ID = itemId;
      console.log(this.update)

      //debugger
      if(this.update.QUANTITY == 0 )  { 
        this.delete_item(location,itemId) 
        return 
      }

      this.busy = this.dataService.up_qty(this.update).subscribe(
        response=>{
          console.log(this.update.QUANTITY)
          if(response.status === 'true'){      
            swal({
              type: 'success', 
              html: '<h4>'+'<b>' + ' บันทึกข้อมูลเรียบร้อยแล้ว ' + '</b>'+'</h4>',
              timer: 900,
              showConfirmButton: false,
              backdrop:	true,
            })
            this.findforUpdate(location);
          }else{ console.log('Update_qty error')}
      })
    }

    delete_item(location,itemId){
      let delete_Data = {
        LOCATION: location,
        ITEM_ID: itemId
      };
   // console.log(delete_Data)
      swal({
        title: ' ITEM ID นี้จะถูกลบออกจาก LOCATION? ',
        text: " ต้องการลบ ITEM ID นี้หรือไม่!",
        type: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'ยกเลิก',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ยืนยัน!'
      }).then((result) => {
        if (result.value) {
          this.dataService.delete_ITEM(delete_Data).subscribe(
            Response=>{
              swal({
                type: 'success', 
                html: '<h4>'+'<b>' + ' ITEM ID นี้ ไม่อยู่ใน LOCATION นี้อีกต่อไป ' + '</b>'+'</h4>',
                timer: 1000,
                showConfirmButton: false,
                backdrop:	true,
              })
              this.findforUpdate(location);
            }
          )}
      })
    }


    BACK_1(){
      this.Page1 = false;
      this.Page2 = false;
      this.Page3 = true;
     // this.barcode.LOCAT = []
      setTimeout(() => { this.focusInput() }, 150)
      this.check_Location();
    }

    BACK_end(){
      this.Page1 = false;
      this.Page2 = true;
      this.Page3 = true;
    //  this.barcode.LOCAT = []
      setTimeout(() => { this.focusInput() }, 150)
    }

    CLEAR(){
      this.Page1 = false;
      this.Page2 = true;
      this.Page3 = true;
      this.barcode.LOCAT = []
      setTimeout(() => { this.focusInput() }, 150)
    }

    focusInput() {
      if ( this.Page1 === false )
      {
        this.input_1.nativeElement.focus();
      }
      else if( this.Page3 === false )
      {
        this.input_2.nativeElement.focus();
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
  




}
