import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment  } from "../../environments/environment";
import { Observable } from 'rxjs';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  readonly DELIMITER = '/';
  private apiUrl = environment.apiUrl; // Use environment variable

  constructor(private http: HttpClient ) { }

   // Method to get data from the API
   getData(url:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${url}`);
  }

  get getPublicUrl(){
    return this.apiUrl + '/';
  }

  // Method to post data to the API
  postData(url:string , data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${url}`, data);
  }

  // Method to patch data to the API
  updateData(url:string,id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${url}/${id}`, data);
  }

  // Method to delete data from the API
  deleteData(url:string,id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${url}/${id}`);
  }

  convertToFormData(obj: any, formData: FormData = new FormData(), parentKey?: string): FormData  {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const formKey = parentKey ? `${parentKey}[${key}]` : key;
        
        if (value && typeof value === 'object') {
          if (value instanceof File) {
            formData.append(formKey, value);
          } else {
            this.convertToFormData(value, formData, formKey);
          }
        } else {
          formData.append(formKey, value);
        }
      }
    }
    
    return formData;
  };
  
  
  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? date.month + this.DELIMITER + date.day + this.DELIMITER + date.year
      : '';
  }


}
