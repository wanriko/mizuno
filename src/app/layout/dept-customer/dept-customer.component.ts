import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { Globals } from '../../components/globals/globals';
import { DataService } from '../../services/index';
import { Subject } from 'rxjs/Subject';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-dept-customer',
  templateUrl: './dept-customer.component.html',
  styleUrls: ['./dept-customer.component.scss']
})
export class DeptCustomerComponent implements OnInit {

  private DeptProduct : any[]; //ข้อมูล DeptProduct ที่มาจากเบส
  // dataDept: any = {};
  // private DeptPro
  // arrayOfStrings = [];

  constructor(
    private globals: Globals,
    private dataService : DataService,  
  ) { }

  ngOnInit():void {
    this.DeptProduct_Fn();
    this.globals.navTitle = 'DEPT CUSTOMER'; 
    this.globals.editMode = true;
  }

  DeptProduct_Fn(){
    this.dataService.DeptProduct_Service().subscribe(response => {
    this.DeptProduct = response.data;
    console.log(this.DeptProduct)
      // response.data.forEach(element => {
      //   this.arrayOfStrings.push(element.DeptPro);
      // }); 
      
    })
  }










































  // DeptProduct_Fn(){
  //   this.dataService.DeptProduct_Service().subscribe(response => {
  //   this.DeptProduct = response.data;
  //   console.log(this.DeptProduct)
  //     // response.data.forEach(element => {
  //     //   this.arrayOfStrings.push(element.DeptPro);
  //     // });  
  //     this.DeptProduct.forEach(function(element) {
  //       // this.arrayOfStrings.push(element.DeptPro);
  //       console.log(element);
  //     });
      
  //   })
  // }

  // // arrayOfStrings = ['this', 'is', 'list', 'of', 'string', 'element'];

  // valueChanged(values) {
  //   this.DeptPro = values;
  // }




}
