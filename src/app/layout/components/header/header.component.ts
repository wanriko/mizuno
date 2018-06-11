import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../components/globals/globals';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(
        private globals: Globals,
        private router:Router,
    ) {}
    ngOnInit() {  }

    onLoggedout() {
        localStorage.removeItem('currentUser');
    }

    goHome(){
        swal({
            title: 'ต้องการกลับสู่หน้าหลัก ?',
            text: 'ข้อมูลจะไม่ถูกบันทึก',
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.value) {
                this.globals.ShowTable();
                this.router.navigate(['/home']);
            }
        })

    }
}
