import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from '../../../services/httpservice.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';// Import CommonModule

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule], // Add CommonModule to imports
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  id: string | null = null;
  record: any; // Define this to hold the fetched data
  imageurl : any;
  documenturl :any;

  constructor(private httpService: HttpserviceService, private route: ActivatedRoute, ) {
    this.imageurl = this.httpService.getPublicUrl;
    this.documenturl = this.httpService.getPublicUrl;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.getRecord();
      }
    });
  }

  getRecord(): void {
    if (this.id) {
      this.httpService.getData(`vehicle/${this.id}`).pipe(
        tap(res => {
          let sc = JSON.parse(JSON.stringify(res.documents));
            res.documents = sc?.map((r:any)=>({...r,preview :`${this.imageurl}${r['imagesrc']}` }))
          this.record = res; 
        }),
        catchError(error => {
          console.error(error);
          // Handle error appropriately
          return of(null); // Return an observable with a default value (null) in case of an error
        })
      ).subscribe();
    }
  }
  

  // formatDate(dateString: string | null): string {
  //   if (dateString) {
  //     return this.datePipe.transform(dateString, 'dd-MM-yyyy') || '';
  //   }
  //   return '';
  // }
}
