import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../utlis/hb-pagination/pagination/pagination.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpserviceService } from '../../services/httpservice.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
  standalone : true,
  imports : [RouterModule , PaginationComponent]
})
export class RoleComponent implements OnInit {
  id:any;
  Tabledata : any = {
    columns : [
      {column : "name",description : "Name" },
      {column : "description",description : "Description" },
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
  
  constructor(private httpService: HttpserviceService, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.getRoledata();
  } 

  
  formatTable(data:any){
    this.Tabledata['total'] = data.total;
    this.Tabledata['items'] = data.data;
   }

   onPaginationChange(ev:any){
    this.Tabledata.currentPage = ev.page;
    this.Tabledata.itemPerPage = ev.itemPerPage;
    this.getRoledata()
   }
  
   getRoledata(){
    this.httpService.getData(`role?skip=${this.Tabledata.currentPage - 1}&limit=${this.Tabledata.itemPerPage}`).subscribe((res:any)=>{
      this.formatTable(res)
    },error=>{
      console.log(error)
    })
  }

}
