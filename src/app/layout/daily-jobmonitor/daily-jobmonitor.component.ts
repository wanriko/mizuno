import { Component, OnInit } from '@angular/core';
import { Globals } from '../../components/globals/globals';
import { DataService } from '../../services/index';

@Component({
  selector: 'app-daily-jobmonitor',
  templateUrl: './daily-jobmonitor.component.html',
  styleUrls: ['./daily-jobmonitor.component.scss']
})
export class DailyJobmonitorComponent implements OnInit {

  constructor(
    private dataService : DataService,  
    private globals: Globals,
  ) { }

  ngOnInit() {
    this.globals.navTitle = 'DailyMonitor'; 
    // this.globals.editMode = true;
    //setInterval(() => this.  name  function (), 55000)
  }

  today = new Date();
  Datenow = this.today.toISOString().slice(0, 10);
  Timenow = this.today.toISOString().slice(11,16);


}
