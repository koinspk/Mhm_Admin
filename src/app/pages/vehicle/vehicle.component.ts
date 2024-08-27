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

  Tabledata :any = {
    columns : [{column : "name",description : "name"},{column:"age",description:"age"},{column:"mobile",description:"mobile"}],
    items : [{name : "hari",age:3 , mobile : 1234},{name : "hari",age:10,mobile : 1234},{name : "hari",age:10,mobile : 1234},{name : "hari",age:10,mobile : 1234},{name : "hari",age:10,mobile : 1234},{name : "hari",age:10,mobile : 1234},{name : "hari",age:10,mobile : 1234},{name : "hari",age:10,mobile : 1234},{name : "hari",age:10,mobile : 1234},{name : "hari",age:10,mobile : 1234}],
    total : 100,
    itemPerPage : 5,
    currentPage : 1
   }

  constructor(private HttpService : HttpserviceService) {

   }

  
  ngOnInit() {
    
  }

}
