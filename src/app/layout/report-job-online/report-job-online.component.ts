import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import swal from 'sweetalert2';
import { Globals } from '../../components/globals/globals';
import { DataService } from '../../services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-job-online',
  templateUrl: './report-job-online.component.html',
  styleUrls: ['./report-job-online.component.scss']
})
export class ReportJobOnlineComponent implements OnInit {

  private dataOnline : any[]; 
  private status: any = {};

  constructor(
    private dataService : DataService,  
    private globals: Globals,
  ) { }

  ngOnInit() {
    this.globals.navTitle = 'Report Online Job'; 
    this.globals.editMode = true;
    this.Data_online();
  }

  Data_online(){
    this.dataService.serv_JobOnline().subscribe(response => { 
      if(response.status)
      { 
        this.dataOnline = response.data;
        console.log( this.dataOnline )
      }    
      else{ console.log('Error') }  
    });
  }

  // dddData_online(){
  //   this.dataService.serv_JobOnline().subscribe(response => { 

  //     if( response.data.length > 0) {

  //        this.dataOnline = response.data;

  //       if( response.data.PICK_TIME == 'default'){  
  //         this.status = 'ยังไม่ส่ง'
  //       }
  //       if(response.data.PICK_TIME == 'End')
  //       {
  //           this.status = 'ส่งเสร็จแล้ว'
  //       }
        
  //     }    
  //     else{ console.log('Error') }  
  //   });
  // }




}
