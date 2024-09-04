import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpserviceService } from '../../services/httpservice.service';
import { PaginationComponent } from '../../utlis/hb-pagination/pagination/pagination.component';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css'],
  standalone : true,
  imports : [RouterModule , PaginationComponent]
})
export class VendorComponent implements OnInit {

  Tabledata : any = {
    columns : [
      {column : "organisation",description : "Organization" },
      {column : "mailid",description : "MailID" },
      {column : "contactperson",description : "Contact Person" },
      {column : "contactno",description : "Contact No" },
      {column : "address",description : "Address" },
      {column : "country",description : "Country" },
      {column : "state",description : "State" },
      {column : "city",description : "City"  },
    
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

  constructor(private HttpService : HttpserviceService) { }

  ngOnInit() {
    this.getVendordata()
  }


  /**
   * Pagination
   * **/
  formatTable(data:any){
    this.Tabledata['total'] = data.total;
    this.Tabledata['items'] = data.data;
   }

   onPaginationChange(ev:any){
    console.log(ev)
    this.Tabledata.currentPage = ev.page;
    this.Tabledata.itemPerPage = ev.itemPerPage;
    this.getVendordata()
   }

   
   getVendordata(){
    this.HttpService.getData(`vendor?skip=${this.Tabledata.currentPage - 1}&limit=${this.Tabledata.itemPerPage}`).subscribe((res:any)=>{
      this.formatTable(res)
    },error=>{
      console.log(error)
    })
  }


}
