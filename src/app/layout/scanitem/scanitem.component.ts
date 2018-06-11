import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { Globals } from '../../components/globals/globals';
import { DataService } from '../../services/index';

@Component({
  selector: 'app-scanitem',
  templateUrl: './scanitem.component.html',
  styleUrls: ['./scanitem.component.scss']
})
export class ScanitemComponent implements OnInit {
  @ViewChild('myInput') inputEl: ElementRef;
  @ViewChild('myitemNum') NumInput: ElementRef;
  @ViewChild('myLocation') LocateInput: ElementRef;
  barcode: any = {};
  dataScan: any = {};
  itemPage: boolean;
  itemNumPage: boolean;
  locationPage: boolean;
  chkLocation: boolean = false;

  constructor(
    private globals: Globals,
    private dataservice: DataService,
  ) { }

  ngOnInit() {
    this.showItemPage();
    this.globals.navTitle = 'Stock Location Item';
    this.globals.editMode = true;
    this.focusInput();
  }
  focusInput() {
    if (this.itemPage === true) {
      this.inputEl.nativeElement.focus();
    } else if (this.itemNumPage === true) {
      this.NumInput.nativeElement.focus();
    } else {
      this.LocateInput.nativeElement.focus();
    }
  }

  clear() {
    if (this.itemPage === true) {
      this.barcode.item = '';
      this.focusInput();
    } else if (this.itemNumPage === true) {
      this.barcode.itemNum = '';
      this.focusInput();
    } else {
      this.barcode.location = '';
      this.focusInput();
    }
  }

  back() {
    if (this.itemNumPage === true) {
      this.showLocation();
    } else {
      this.showItemPage();
    }
  }

  showItemPage() {
    this.itemPage = true;
    this.itemNumPage = false;
    this.locationPage = false;
    setTimeout(() => { this.focusInput() }, 100)
  }

  showItemNum() {
    this.itemPage = false;
    this.itemNumPage = true;
    this.locationPage = false;
    setTimeout(() => { this.focusInput() }, 100)
  }
  showLocation() {
    this.itemPage = false;
    this.itemNumPage = false;
    this.locationPage = true;
    setTimeout(() => { this.focusInput() }, 100)
  }

  submit() {
    //console.log(this.barcode);
    this.dataservice.scanitem(this.barcode).subscribe(res => {
      console.log(res);
      if (res.status == 'error') {
        this.barcode.item = '';
        swal({
          type: 'error',
          title: 'ข้อมูล ITEM ไม่ถูกต้อง!',
          text: 'กรุณาตรวจสอบข้อมูลอีกครั้ง',
          showConfirmButton: false,
          timer: 2000
        })
      } else if (res.status === 'success') {
        this.dataScan = res.member[0];
        this.dataservice.chkstockitem(this.barcode).subscribe(res => {
          if (res.status === 'error') {
            swal({
              type: 'error',
              title: 'ข้อมูล ไม่ถูกต้อง!',
              text: 'กรุณาตรวจสอบข้อมูลอีกครั้ง',
              showConfirmButton: false,
              timer: 2000
            })
          } else if (res.status === 'duplicate') {
            this.dataScan.LOCATION_ID = res.member[0].LOCATION_ID;
            this.dataScan.location = res.member[0].LOCATION_BARCODE;
            this.dataScan.QUANTITY = res.member[0].QUANTITY
            swal({
              title: 'ITEM นี้ถูกกำหนด LOCATION แล้ว',
              html: 'สแกนบาร์โค๊ด LOCATION <h4>' + this.dataScan.LOCATION_ID + '</h4> เพื่อยืนยัน',
              type: 'warning',
              showCancelButton: true,
              confirmButtonClass: 'btn btn-success',
              cancelButtonClass: 'btn btn-danger',
              confirmButtonText: 'ยืนยัน',
              cancelButtonText: 'ยกเลิก'
            }).then((result) => {
              if (result.value) {
                this.showLocation();
                this.chkLocation = true;
              }
            })
          } else if (res.status === 'success') {
            this.showLocation();
            this.chkLocation = false;
          }
        })
        /*         console.log(res.member);
                this.dataScan = res.member[0] ; 
                this.showItemNum(); */
      }
    })
  }

  submitLocate() {

    if (this.chkLocation === true) {
      if (this.barcode.location !== this.dataScan.location) {
        this.barcode.location = '';
        swal({
          type: 'error',
          title: 'บาร์โค๊ด LOCATION ไม่ถูกต้อง!',
          text: 'กรุณาสแกนบาร์โค๊ดอีกครั้ง',
          showConfirmButton: false,
          timer: 2000
        })
        return false;
      } else {
        this.barcode.itemNum = 1;
        return this.showItemNum();
      }
    }
    this.dataservice.scanlocation(this.barcode).subscribe(res => {
      console.log(res);
      if (res.status === 'error') {
        this.barcode.location = '';
        swal({
          type: 'error',
          title: 'ข้อมูล LOCATION ไม่ถูกต้อง!',
          text: 'กรุณาสแกนบาร์โค๊ดอีกครั้ง',
          showConfirmButton: false,
          timer: 2000
        })
      } else if (res.status === 'success') {
        this.dataservice.chkstocklocation(this.barcode).subscribe(re => {
          console.log(re.status);
          if (re.status === 'error') {
            this.barcode.location = '';
            swal({
              type: 'error',
              title: 'ข้อมูล LOCATION ไม่ถูกต้อง!',
              text: 'กรุณาสแกนบาร์โค๊ดอีกครั้ง',
              showConfirmButton: false,
              timer: 2000
            })
          } else if (re.status === 'duplicate') {
            this.barcode.location = '';
            swal({
              type: 'warning',
              title: 'ข้อมูล LOCATION ซ้ำ!',
              text: 'ITEM นี้ไม่สามารถกำหนด LOCATION นี้ได้',
              showConfirmButton: false,
              timer: 2000
            })
          } else if (re.status === 'success') {
            this.dataScan.LOCATION_ID = res.member[0].LOCATION_ID;
            this.barcode.itemNum = 1;
            this.showItemNum();
          }
        })
      }
    })
  }

  check() {
    if (this.barcode.chkNum !== this.barcode.item) {
      swal({
        type: 'error',
        title: 'บาร์โค๊ด ไม่ถูกต้อง!',
        text: 'โปรดสแกนบาร์โค๊ด ITEM อีกครั้ง',
        showConfirmButton: false,
        timer: 2000
      })
      this.barcode.chkNum = '';
      this.focusInput();
    } else {
      this.barcode.itemNum++
      this.barcode.chkNum = '';
      this.focusInput();
    }

  }


  submitItemNum() {
    const USER_CREATE = this.globals.user.Username  
    const location = this.dataScan.LOCATION_ID;
    const item = this.dataScan.ITEM_ID;
    var itemNum = this.barcode.itemNum;
    if (this.chkLocation === false) {
      const data = { location, item, itemNum, USER_CREATE };
      ////// ADD STOCK
      this.dataservice.addstocklocation(data).subscribe(res => {
        console.log(res);
        if (res.status == 'error') {
          swal({
            type: 'error',
            title: 'ข้อมูล ไม่ถูกต้อง!',
            text: 'กรุณาตรวจสอบข้อมูลอีกครั้ง',
            showConfirmButton: false,
            timer: 2000
          })
        } else if (res.status == 'success') {
          swal({
            type: 'success',
            title: 'บันทึกข้อมูลเรียบร้อยแล้ว',
            showConfirmButton: false,
            timer: 1500
          })
          this.barcode = {};
          this.dataScan = {};
          this.showItemPage();
        }
      })
    } else {
      const number: Number = this.barcode.itemNum
      itemNum = number + this.dataScan.QUANTITY;
      const data = { location, item, itemNum, USER_CREATE };
      this.dataservice.updatestock(data).subscribe(res => {
        console.log(res);
        if (res.status == 'error') {
          swal({
            type: 'error',
            title: 'ข้อมูล ไม่ถูกต้อง!',
            text: 'กรุณาตรวจสอบข้อมูลอีกครั้ง',
            showConfirmButton: false,
            timer: 2000
          })
        } else if (res.status == 'success') {
          swal({
            type: 'success',
            title: 'บันทึกข้อมูลเรียบร้อยแล้ว',
            showConfirmButton: false,
            timer: 1500
          })
          this.barcode = {};
          this.dataScan = {};
          this.showItemPage();
        }
      })
    }
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
