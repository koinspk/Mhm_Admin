import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../../utlis/hb-pagination/pagination/pagination.component';
import { HttpserviceService } from '../../services/httpservice.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
  standalone:true,
  imports : [RouterModule , PaginationComponent],
})
export class VehicleComponent implements OnInit {

  // Tabledata :any = {
  //   columns : 
  //   [
  //     {column : "name",description : "name" }, // action default true
  //     {column:"age",description:"age"},
  //     {column:"mobile",description:"mobile" },
  //     {column:"image",description:"Image" , img : true , width : '50px' , height : '50px' },
  //     {column : "action" , description : "Action" , value : "age" , action : true, 
  //       actions : 
  //       [ 
  //         { action : 'view' , display : "View" ,  icon : 'bi bi-eye'  , size : '18px' , color : 'green' } ,
  //         { action : 'edit' , display : "Edit" , icon : 'bi bi-pencil' , size : '18px' , color : 'blue' },
  //         { action : 'delete' ,display : "Delete" ,  icon : 'bi bi-trash'  , size : '18px' , color : 'red' },
  //       ] }
  //   ],
  //   items : [
  //     {name : "hari",age:3 , mobile : 1234 , image : "https://fastly.picsum.photos/id/122/536/354.jpg?hmac=LN0BaIaTS5AbEptgW0-6CmgtjICcjJlfcTpuZ9PW1RM"},{name : "hari",age:10,mobile : 1234},
  //     {name : "hari",age:10,mobile : 1234 , image : "https://fastly.picsum.photos/id/237/536/354.jpg?hmac=i0yVXW1ORpyCZpQ-CknuyV-jbtU7_x9EBQVhvT5aRr0"},{name : "hari",age:10,mobile : 1234},{name : "hari",age:10,mobile : 1234},{name : "hari",age:10,mobile : 1234},{name : "hari",age:10,mobile : 1234},{name : "hari",age:10,mobile : 1234},{name : "hari",age:10,mobile : 1234},{name : "hari",age:10,mobile : 1234}],
  //   total : 100,
  //   itemPerPage : 5,
  //   currentPage : 1 
  //  }

  Tabledata : any = {
    columns : [
      {column : "plateno",description : "Plate no" },
      {column : "make",description : "Make" },
      {column : "model",description : "Model" },
      {column : "year",description : "Year" },
      {column : "color",description : "Color" },
      {column : "chassisNo",description : "Chassis No" },
      {column : "engineNo",description : "Engine No" },
      {column : "fcexpirydate",description : "FC Expiry" , date : true },
      {column : "insuranceexpirydate",description : "Insurance Expiry" , date : true },
      {column : "action" , description : "Action" , value : "_id" , action : true, 
      actions : 
      [ 
        { action : 'view' , display : "View" ,  icon : 'bi bi-eye'  , size : '18px' , color : 'green' } ,
        { action : 'edit' , display : "Edit" , icon : 'bi bi-pencil' , size : '18px' , color : 'blue' },
        { action : 'delete' ,display : "Delete" ,  icon : 'bi bi-trash'  , size : '18px' , color : 'red' },
      ] }
    ],
    total : 0,
    itemPerPage : 5,
    currentPage : 1 
  };
  constructor(private HttpService : HttpserviceService) {

   }

   formatTable(data:any){
    this.Tabledata['total'] = data.total;
    this.Tabledata['items'] = data.data;
   }

   onPaginationChange(ev:any){
    console.log(ev)
    this.Tabledata.currentPage = ev.page;
    this.Tabledata.itemPerPage = ev.itemPerPage;
    this.getVehicledata()
   }
  
  ngOnInit() {
  this.getVehicledata()
  }

  getVehicledata(){
    this.HttpService.getData(`vehicle?skip=${this.Tabledata.currentPage - 1}&limit=${this.Tabledata.itemPerPage}`).subscribe((res:any)=>{
      this.formatTable(res)
    },error=>{
      console.log(error)
    })
  }

}
