import { AfterViewInit, Component, Input, OnInit, ViewChild, VERSION } from '@angular/core';
// Import DataTable
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/index';
import { debounceTime } from 'rxjs/operator/debounceTime';
import swal from 'sweetalert2';
import { Globals } from '../../components/globals/globals';


@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss'],
})

export class LocationComponent implements OnInit, AfterViewInit {
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    busy: Subscription;
    dtable: boolean = false;
    Locate: any = {};
    dataLocates: any[];
    today = new Date();
    d: number = this.today.getDate() + 1;
    m: number = this.today.getMonth() + 1;
    y: number = this.today.getFullYear();


    constructor(
        public dataservice: DataService,
        private globals: Globals,

    ) {
        this.loadAllLocate();
    }
    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
        };
        this.globals.navTitle = "LOCATION MASTER";
        this.globals.editMode = true;
        this.globals.headerAE();
        setInterval(() => this.loadAllLocate(), 60000)
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

    loadAllLocate() {
        this.busy = this.dataservice.datalocate().subscribe(res => {
            this.dataLocates = res.data;
            if (this.dataLocates.length === 0) {
                this.globals.showtable = true;
            } else {
                this.rerender();
                console.log("dataLocates = " + this.dataLocates.length);

            }
        });
    }


    cancel() {
        this.Locate = {};
        this.globals.ShowTable();
        this.loadAllLocate();//เรียกฟังชันโหลดรายชื่อ staff เพื่อรีเฟสข้อมูลในตาราง
    }

    Update(id: number) {
        this.globals.UpdateForm(); // แสดงฟอร์ม staff
        this.Locate = this.dataLocates[id]; // ดึงข้อมูลจาก staffs อิงจาก index ของ array
        this.globals.editmode = true; // อยู่ในโหมดแก้ไขข้อมูล
    }




    doSubmitLocate() {
        var user = this.globals.user;       //ค่าจาก login ของเอ ที่เก็บค่าไว้จากตอนที่ login เข้าระบบ
        this.Locate.USER_CREATE = user.Username;       //ค่าจาก login ของเอ ที่เก็บค่าไว้จากตอนที่ login เข้าระบบ
        var Location_id = this.Locate.LOCATION_ID;
        this.Locate.WH_NO = Location_id.slice(0, 1);
        this.Locate.AREA = Location_id.slice(1, 2);
        this.Locate.ZONE_NO = Location_id.slice(2, 3);
        this.Locate.AISEL_NO = Location_id.slice(3, 4);
        this.Locate.BAY_NO = Location_id.slice(4, 6);
        this.Locate.STAGE_NO = Location_id.slice(6, 7);
        this.Locate.BIN_NO = Location_id.slice(7, 8);

        // ไม่ใช่โหมดแก้ไข เป็นโหมดเพิ่มข้อมูลใหม่
        // ในการทดสอบนี้เราทำาร push array ของ object staff ใหม่ เพิ่ม

        if (this.globals.editmode == false) {
            this.busy = this.dataservice.addlocate(this.Locate).subscribe(res => {
                if (res.status === 'error') {
                    console.log(res.member);
                    swal(
                        'Oops...',
                        'ข้อมูลไม่ถูกต้อง !',
                        'error'
                    )
                } else {
                    swal({
                        type: 'success',
                        title: 'บันทึกข้อมูลเรียบร้อยแล้ว',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.loadAllLocate();//เรียกฟังชันโหลดรายชื่อ staff เพื่อรีเฟสข้อมูลในตาราง
                    this.Locate = {};

                }
            });
        } else { // แต่ถ้าเป็นโหมดแก้ไข เราก็ให้อัพเดทข้อมูล staffs array ตาม index ที่ส่งมา แก้ไข

            swal({ // เรียก popup confrim การลบ staff
                title: 'Are you sure?',
                html: '<font color = "orange">คุณต้องการแก้ไข </font>' + this.Locate.LOCATION_ID + " หรือไม่?",
                type: 'warning',

                showCancelButton: true,
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                confirmButtonText: 'ยืนยัน',
                cancelButtonText: 'ยกเลิก'
            }).then((result) => {
                if (result.value) {
                    this.dataservice.updatelocate(this.Locate).subscribe(res => {
                        if (res.status === "success") { //เมื่อแก้ไข staff แล้ว
                            swal({//ให้แสดง popup success
                                type: 'success',
                                title: 'บันทึกข้อมูลเรียบร้อยแล้ว',
                                showConfirmButton: false, //ปิดปุ่มยืนยัน
                                timer: 1500 // ระยะเวลาแสดง popup (1000 = 1วินาที)
                            })
                            this.loadAllLocate();//เรียกฟังชันโหลดรายชื่อ staff เพื่อรีเฟสข้อมูลในตาราง

                        } else {
                            console.log(res.member)
                            swal(
                                'Oops...',
                                'ข้อมูลไม่ถูกต้อง !',
                                'error'
                            )
                        }
                    });
                }
            })
        }
    }
}
