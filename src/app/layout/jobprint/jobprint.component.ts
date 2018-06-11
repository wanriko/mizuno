import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
//Import Service
import { DataService } from '../../services/index';
//Import SweetAlert
import swal from 'sweetalert2';
//Import Golbal
import { Globals } from '../../components/globals/globals';
//Import DataTable
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-jobprint',
  templateUrl: './jobprint.component.html',
  styleUrls: ['./jobprint.component.scss']
})
export class JobprintComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    public dataservice: DataService,
    private globals: Globals,
  ) { }

  ngOnInit() {
    this.globals.navTitle = 'PRINT JOB';
    this.globals.editMode = true;

    // DataTable
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
  }


  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }


}
