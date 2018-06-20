import { Injectable, ErrorHandler } from '@angular/core';
import { Http,RequestOptions, ResponseContentType, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { errorHandler } from '@angular/platform-browser/src/browser';
import { error, log } from 'util';


class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Injectable()
export class DataService {
  constructor(private http: Http) {  }

  login(user) {
    return this.http.post('http://10.0.120.126:1668/api/login',user)
      .map(res => res.json());
  }

  logout() {
    localStorage.removeItem('currentUser');
  }


///////////////////////////////////////// Location master ////////////////////
  datalocate() {
    return this.http.post('http://10.0.120.126:1668/api/datalocate',{})
      .map(res => res.json());
  }
 
  addlocate(Locate) {
    
    return this.http.post('http://10.0.120.126:1668/api/adlocate',Locate)
      .map(res => res.json());
  }

  updatelocate(Locate) {
    console.log(Locate)
    return this.http.post('http://10.0.120.126:1668/api/uplocate', Locate)
      .map(res => res.json());
  }

  scanitem(data){
    return this.http.post('http://10.0.120.126:1668/api/scanitem', data)
      .map(res => res.json());
  }

  scanlocation(data){
    return this.http.post('http://10.0.120.126:1668/api/scanlocation', data)
      .map(res => res.json());
  }

  chkstockitem(data) {
    return this.http.post('http://10.0.120.126:1668/api/chkstockitem', data)
      .map(res => res.json());
  }

  chkstocklocation(data) {
    return this.http.post('http://10.0.120.126:1668/api/chkstocklocation', data)
      .map(res => res.json());
  }

  updatestock(data) {
    return this.http.post('http://10.0.120.126:1668/api/updatestock', data)
      .map(res => res.json());
  }

  addstocklocation(data) {
    return this.http.post('http://10.0.120.126:1668/api/stocklocation', data)
      .map(res => res.json());
  }

 //////////////////////  http://10.0.120.126:1669/api/name  //////////////////////

 /////////////////////////////////////////////////////////////////////////////////
 ///////////////////////////////  job-control-header  ////////////////////////////
 Job_HEAD_BIG_CONSOL(){
  return this.http.post('http://localhost:1234/api/Job_HEADER_BIGJOB_CONSOLIDATE',[])
  .map(res => res.json());
}

  //--------  แสดงรายละเอียด ข้อมูลของงานค้าง 
  Detail_RemainJob(){
    return this.http.post('http://localhost:1234/api/DetailRemain_JobH',[])
    .map(res => res.json());
  }

  //--------  แสดงรายละเอียด ข้อมุลงานวันปัจจุบันที่เสร็จ
  Detail_SuccessJob(){
    return this.http.post('http://localhost:1234/api/SuccessRemain_JobH',[])
    .map(res => res.json());
  }

  //--------  แสดงรายละเอียด ข้อมูลงาน WAVE_BIG_JOB ทั้งหมด
  Detail_WaveJob(){
    return this.http.post('http://localhost:1234/api/Detail_WaveBigJob',[])
    .map(res => res.json());
  }

 //------- แสดงรายละเอียด ข้อมูลงาน CONSOLIDATE
  Detail_ConsolJob(){
    return this.http.post('http://localhost:1234/api/Detail_Consolidate',[])
    .map(res => res.json());
  }

  /////////////////////////////////////////////////////////////////////////
  //////////////////////////// scan-job-detail ////////////////////////////
  // -------- งานทั้งหมด
  SearchBill_No(Rawdata){
    console.log(Rawdata);
    return this.http.post('http://localhost:1234/api/SearchBillNo', Rawdata)
    .map(res => res.json());
  }

  
  //////////////////////////////////////////////////////////////
  ////////////////////// status-report /////////////////////////
  //------------ Status Remain
  status_Remain(){
    console.log();
    return this.http.post('http://localhost:1234/api/statusRemain', [])
    .map(res => res.json());
  }

   //------------ Status Doing
  status_Doing(){
    console.log();
    return this.http.post('http://localhost:1234/api/statusDoing', [])
    .map(res => res.json());
  }

   //------------ Status Complete
  status_Complete(){
    console.log();
    return this.http.post('http://localhost:1234/api/statusComplete', [])
    .map(res => res.json());
  }

  //////////////////////////////////////////////////////////////////////
  /////////// dropdown เลือก DeptProduct
  DeptProduct_Service(){
    console.log();
    return this.http.post('http://localhost:1234/api/Dept_Product', [])
    .map(res => res.json());
  }

  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////  worker-checkjob  ///////////////////////////////
  //--------------- TSDC_WAVE_BIG_JOB --------Check WAVE_BIG_JOB_NO 
  Bill_Service(input){
    // console.log(input);
    return this.http.post('http://localhost:1234/api/Scan_Job', input)
    .map(res => res.json());
  }

  //--------------- TSDC_WAVE_BIG_JOB --------Check WAVE_BIG_JOB_NO , BCODE_885_ITM
  Bill_Item_Service(input){
    // console.log(input);
    return this.http.post('http://localhost:1234/api/Scan_Job_Barcode', input)
    .map(res => res.json());
  }

  //---------------  UPDATE WORKER_ID +++ START_CHECK_TIME
  Upd_WorkerTCheck(barcode){
    console.log(barcode);
    return this.http.post('http://localhost:1234/api/Update_WorkerStartCheck', barcode)
    .map(res => res.json());
  }

  //---------------  UPDATE อื่นนนนนๆๆๆ 
  Upd_EndCheck(barcode){
    console.log(barcode);
    return this.http.post('http://localhost:1234/api/Update_EndCheck', barcode)
    .map(res => res.json());
  }

///////////////////////////////////////////////////////////////////////////
/////////////////////////////////api_DailyMonitor
 Service_DailyMonitor(){
  return this.http.post('http://localhost:1234/api/api_DailyMonitor',[])
  .map(res => res.json());
}

///////////////////////////////////////////////////////////////////////////
//////////////// show  LocationItem ///////////////////////////////////////
getTableLocationItem(){
  return this.http.post('http://localhost:1234/api/TableLOCATION_ITEM','')
  .map(res => res.json());
}

//////////////// Search  LocationItem //////////////////////////////////////  
SearchLocationItem(ITEM_ID){
  // console.log('dataservice/SearchLocationItem ITEM_ID  :'+ITEM_ID);
  var LocationItem = { ITEM_ID };//เอาค่า id ใส่ใน array userID
  return this.http.post('http://localhost:1234/api/SearchLOCATION_ITEM',LocationItem)
  .map(res => res.json());
}


Locations_list(STATUS_AA02) {
  // console.log('dataservice/Locations_list(STATUS_AA02): '+STATUS_AA02);
  return this.http.post('http://localhost:1234/api/locationsList',{STATUS_AA02})
  .map(res => res.json());
}

 //////////////// update LocationItem /////////////////    
UpdStatusItem(LCTitem){
  // console.log("dataservice/UpdStatusItem(LCTitem) :" + LCTitem.STATUS_AA01 )
 //var StatusItem = { LOCATION_ID };//เอาค่า id ใส่ใน array userID
  return this.http.post('http://localhost:1234/api/UpdateStatusLocation', LCTitem)
    .map(res => res.json());
}

//////////////// insert LocationItem /////////////////    
insertStatusItem(location_id){
  // console.log("dataservice/insertStatusItem(location_id) :" + location_id )
  // console.log('dataservice/ไม่สำเร็จ'+JSON.stringify(location_id))
 //var StatusItem = { LOCATION_ID };//เอาค่า id ใส่ใน array userID
  return this.http.post('http://localhost:1234/api/insertLOCATION_ITEM', location_id)
    .map(res => res.json());
}

//////////////// Search   ITEM_MASTER ///////////////// 
SearchITEM_MASTER(){
  return this.http.post('http://localhost:1234/api/SearchITEM_MASTER','')
  .map(res => res.json());
}

//////////////// Search   ITEM_DESC ///////////////// 
SearchItemDesc(itemId){
  return this.http.post('http://localhost:1234/api/SearchITEM_DESC',{itemId:itemId})
  .map(res => 
    res.json()
  );
}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//////////// RECEIVE BARCODE  SCAN BARCODE ITEM
SearchItem(dataBar){
  //console.log(dataBar);
  return this.http.post('http://localhost:1234/api/SearchITEM', dataBar)
  .map(res => res.json());
}

////////////////////////////////////////////////////////////
/////////////// check stock in location //////////////////
////////////   check_Location()   findforUpdate(LOCATION)
ServiceLocation_Id(data){
  return this.http.post('http://localhost:1234/api/SearchLocation_Id', data)
  .map(res => res.json());
}

////////////  Update_qty()
up_qty(data){
  return this.http.post('http://localhost:1234/api/updateQTY', data)
  .map(res => res.json());
}

////////////  delete_item()
delete_ITEM(data){
  return this.http.post('http://localhost:1234/api/delete_ITEM_ID', data)
  .map(res => res.json());
}



////////////////////////////////////////////////////////////
//111111111111 GOODS IMPORT                111111111111//
//////////// SCAN BARCODE ITEM IMPORT ---- 
Serv_BarVender(data){
  return this.http.post('http://localhost:1234/api/SearchBar_VENDER', data)
  .map(res => res.json());
}
  
////////////////////  KEY IN GOODS IMPORT  //////////////////
//---------------     222222222222         //////////////////
//---------------  SCAN BARCODE ITEM IMPORT ----------------
Search_BVENDER(vender){
  return this.http.post('http://localhost:1234/api/SearchBVENDER', vender)
  .map(res => res.json());
}

//---------------  CHECK 885 ++++ VENDER anddddd KEY IN---------------
KEYIN_Goods_import(input){
  return this.http.post('http://localhost:1234/api/KEYIN_GOODSIMPORT', input)
  .map(res => res.json());
}




  
}


