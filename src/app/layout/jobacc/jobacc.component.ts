import { Component, OnInit } from '@angular/core';
import { Globals } from '../../components/globals/globals';
import { DataService } from '../../services/index';

@Component({
  selector: 'app-jobacc',
  templateUrl: './jobacc.component.html',
  styleUrls: ['./jobacc.component.scss']
})
export class JobaccComponent implements OnInit {

  constructor(
    private globals: Globals,
    private dataservice: DataService,
  ) { }

  ngOnInit() {
    this.globals.navTitle = 'Job Accept';
    this.globals.editMode = true;
  }

}
