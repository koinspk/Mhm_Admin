import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbAlertModule, NgbDate, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HttpserviceService } from '../../../services/httpservice.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule,NgbDatepickerModule, NgbAlertModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})


export class FormComponent implements OnInit {
  
VehicleForm !: FormGroup;
years :any = [];
files: { name: string, url: string, type: string }[] = [];

proofs:any = [
  { index : 1 , name : "RC" },
  { index : 2 , name : "FC" },
  { index : 3 , name : "Insurance" },
  { index : 4 , name : "Pollution Certificate" },
  { index : 5 , name : "Permit Type 1" },
  { index : 6 , name : "Permit Type 2" },
  { index : 7 , name : "Permit Type 3" },
];
minDate!: NgbDate;

  constructor(private fb: FormBuilder , private httpService : HttpserviceService){
    const today = new Date();
    this.minDate = new NgbDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
 
  }


  ngOnInit(): void {
    this.VehicleForm = this.fb.group({
      plateno : ['', [Validators.required, Validators.minLength(5)]],
      make : [''],
      model : [''],
      year : [''],
      fueltype : [''],
      color : [''],
      chassisNo : [''],
      engineNo : [''],
      fcexpirydate : [''],
      insuranceexpirydate : [''],
      documents : this.fb.array([this.fnDocuments()])
    });

    this.generateYears();
   
  }

  fnDocuments(){
    return this.fb.group({
      type : ['',Validators.required],
      imagesrc: [''],
      startDate: ['', Validators.required],
      endDate: ['', [Validators.required]]
    });
  }

  generateYears() {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 30;
    for (let year = startYear; year <= currentYear; year++) {
      this.years.push(year);
    }
  }

  get f():{[key:string]:AbstractControl} {
    return this.VehicleForm.controls
  }

  async onSubmit(){
  
    // try {
    //     let record = this.httpService.convertToFormData(this.VehicleForm.value);
    //     console.log(record);
        
    //   this.httpService.postData('vehicle',record).subscribe(res=>{
    //     console.log(res)
    //   },err=>{
    //     console.log(err)
    //   })
     
    // } catch (error) {
    //   console.log(error);
    // }



  }

  get getDocuments() : FormArray {
    return this.VehicleForm.get("documents") as FormArray
  }


  
  addDocuments(){
    this.getDocuments.push(this.fnDocuments());
  }

  onFromDateChange(date: NgbDateStruct | null): void {
   
   
  }

  onInputChange(ev:any,field:string){
    console.log(ev)
    //this.VehicleForm.get(field)?.patchValue(this.httpService.parse(ev))
  }


  /**
   * FILE UPLOAD SNIPPETS Start -------------------------------------------------------------
   * **/

  onFilesSelected(event: any) {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.files.push({
            name: file.name,
            url: e.target.result,
            type: file.type
          });
        };

        reader.readAsDataURL(file);
      }
    }
  }

  onFileSelectDocuments(event:any , index:number){
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const reader = new FileReader();

        reader.onload = (e: any) => {
          (this.getDocuments.at(index) as FormGroup).get('imagesrc')?.setValue({
            name: file.name,
            url: e.target.result,
            type: file.type
          })
          
        };

        reader.readAsDataURL(file);
      }
    }
  }

  removeFile(file: { name: string }) {
    this.files = this.files.filter(f => f.name !== file.name);
  }
  
   /**
   * FILE UPLOAD SNIPPETS END ----------------------------------------------
   * **/


}
