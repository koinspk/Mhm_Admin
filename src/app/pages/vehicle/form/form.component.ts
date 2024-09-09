import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, Form, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbAlertModule, NgbDate, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HttpserviceService } from '../../../services/httpservice.service';
import { HbDatepickerComponent } from '../../../utlis/hb-datepicker/hb-datepicker.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule,NgbDatepickerModule, NgbAlertModule , HbDatepickerComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})


export class FormComponent implements OnInit {
  
VehicleForm !: FormGroup;
multiplefileuploadreference : any;

years :any = [];
files: { name: string, url: string, type: string , file : BinaryData}[] = [];

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
  id: any  ;

  constructor(
    private fb: FormBuilder , 
    private httpService : HttpserviceService,
    private route: ActivatedRoute,
  ){
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
 
    /**
     * 
     * Check page is EDIT and Patch data
     * 
     * **/
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.getVehicleRecoedById()
      }
    });
      /**
       * 
     * Check page is EDIT and Patch data
     * 
     * **/
  }


  getVehicleRecoedById(){
   
          this.httpService.getData(`vehicle/${this.id}`).subscribe((res:any)=>{
            console.log("Response::",res)
            delete res._id;
            delete res.images;
            //delete res.documents;
            delete res.isDeleted;
            delete res.createdAt;
            delete res.updatedAt;
            delete res.__v;
          // res['documents'] = [];
          const documentsArray = this.VehicleForm.get('documents') as FormArray;
          documentsArray.clear();
          
          // If documents exist, push them into the FormArray
          if (res.documents && res.documents.length) {
            res.documents.forEach((doc: any) => {
              const documentGroup = this.fnDocuments();
              documentGroup.patchValue(doc); // Set the values for each document
              documentsArray.push(documentGroup);
            });
          }
              this.VehicleForm.setValue(res);
            
          },error=>{
            console.log(error)
          })
   
  }

  fnDocuments(){
    return this.fb.group({
      _id : [''],
      type : ['',Validators.required],
      imagesrc: [''],
      preview: [''],
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

    
    this.multiplefileuploadreference = JSON.parse(JSON.stringify(this.VehicleForm.get('documents')?.value));;
    
    try {
        this.VehicleForm.value['documents']?.map((r:any)=> delete r['preview'] );
        this.VehicleForm.value['files'] = this.files?.map((res:any)=>res.file); 

        let record = this.httpService.convertToFormData(this.VehicleForm.value);

      this.httpService.postData('vehicle',record).subscribe(res=>{
        console.log(res)
      },err=>{
        console.log(err)
      })
     
    } catch (error) {
      console.log(error);
     }



  }

  get getDocuments() : FormArray {
    return this.VehicleForm.get("documents") as FormArray || []
  }


  
  addDocuments(){
    this.getDocuments.push(this.fnDocuments());
  }

  onFromDateChange(date: NgbDateStruct | null): void {
   
   
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
            type: file.type,
            file : file
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onFileSelectDocuments(event:any , index:number){
    let selectedFiles = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      (this.getDocuments.at(index) as FormGroup).get('imagesrc')?.setValue(selectedFiles);
      (this.getDocuments.at(index) as FormGroup).get('preview')?.setValue(e.target.result);
    };
    reader.readAsDataURL(selectedFiles);

  }

  removeFile(file: { name: string }) {
    this.files = this.files.filter(f => f.name !== file.name);
  }
  
   /**
   * FILE UPLOAD SNIPPETS END ----------------------------------------------
   * **/

  
}
