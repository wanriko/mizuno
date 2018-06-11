import { Injectable } from '@angular/core';

@Injectable()
export class Globals { 
  navTitle: string;
  editMode: boolean = false;
  showtable = false;
  showform = true;
  showcolum = true;
  editmode = true;
  deletemode = true;
  disable: any = {};
  datepicker : any = {};
  user = JSON.parse(localStorage.getItem('mizunoUser'));

  stat_locate = [
    { name: 'A', descri: 'Active' },
    { name: 'C', descri: 'Close' },
    { name: 'H', descri: 'Hold' },
    { name: 'R', descri: 'Reserved' }
  ];

  type_locate = [{ name: 'F', descri: 'Fast' }, { name: 'S', descri: 'Slow' }];


  headerAE() {
    this.disable.add = true;
    this.disable.edit = true;
    this.disable.del = false;
  }

  headerALL(){
    this.disable.add = true;
    this.disable.edit = true;
    this.disable.del = true;
  }

  ShowTable() {
    this.showtable = false;
    this.showform = true;
    this.showcolum = true;
    this.editmode = true;
    this.deletemode = true;
    this.datepicker = {};
  }
  ShowForm() {
    this.showtable = true;
    this.showform = false;
    this.showcolum = false;
    this.editmode = false;
    this.deletemode = false;
  }

  UpdateForm() {
    this.showtable = true;
    this.showform = false;
    this.showcolum = false;
    this.editmode = true;
    this.deletemode = true;
  }

  UpdateTable() {
    this.showtable = false;
    this.showform = true;
    this.showcolum = false;
    this.editmode = false;
    this.deletemode = true;
  }

  DeleteTable() {
    this.showtable = false;
    this.showform = true;
    this.showcolum = false;
    this.editmode = true;
    this.deletemode = false;
  }

 }
