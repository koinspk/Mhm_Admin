import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit{

   Tabledata :any = {
    columns : [{column : "name",description : "name"},{column:"age",description:"age"},{column:"mobile",description:"mobile"}],
    items : [{name : "hari",age:3 , mobile : 1234},{name : "hari",age:10,mobile : 1234},{name : "hari",age:10,mobile : 1234},{name : "hari",age:10,mobile : 1234},{name : "hari",age:10,mobile : 1234},{name : "hari",age:10,mobile : 1234},{name : "hari",age:10,mobile : 1234},{name : "hari",age:10,mobile : 1234},{name : "hari",age:10,mobile : 1234},{name : "hari",age:10,mobile : 1234}],
    total : 10,
    itemPerPage : 10,
    currentPage : 1
   }

  constructor(){

  }

  ngOnInit(): void {
    
  }



}
