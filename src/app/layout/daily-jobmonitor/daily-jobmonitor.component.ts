import { Component, OnInit } from '@angular/core';
import { Globals } from '../../components/globals/globals';
import { DataService } from '../../services/index';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-daily-jobmonitor',
  templateUrl: './daily-jobmonitor.component.html',
  styleUrls: ['./daily-jobmonitor.component.scss']
})
export class DailyJobmonitorComponent implements OnInit {

  constructor(
    private dataService : DataService,  
    private globals: Globals,
    private router : Router,
  ) { }

  ngOnInit() {
    this.globals.navTitle = 'DailyMonitor'; 
    this.globals.editMode = true;
    //setInterval(() => this.  name  function (), 55000)
  }

  today = new Date();
  Datenow = this.today.toISOString().slice(0, 10);
  Timenow = this.today.toISOString().slice(11,16);


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
