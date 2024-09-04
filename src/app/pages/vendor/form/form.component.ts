import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HbDatepickerComponent } from '../../../utlis/hb-datepicker/hb-datepicker.component';
import { HttpserviceService } from '../../../services/httpservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  imports : [ReactiveFormsModule, HbDatepickerComponent],
  standalone : true
})
export class FormComponent implements OnInit {

  VendorForm !: FormGroup;
  id:any;
  imageUrl: string;


  constructor(
    private fb: FormBuilder , 
    private httpService : HttpserviceService,
    private route: ActivatedRoute,
  ) { 
    this.imageUrl = this.httpService.getPublicUrl;
  }

  ngOnInit() {

    this.VendorForm = this.fb.group({
      organisation : ['', [Validators.required, Validators.minLength(5)]],
      mailid : [''],
      password : [''],
      contactperson : [''],
      contactno : [''],
      address : [''],
      country : [''],
      state : [''],
      city : [''],
      gst : [''],
      pan : [''],
      logo : this.fb.group({
        file : [''],
        preview : ['']
      })
      
    });

        /**
     * 
     * Check page is EDIT and Patch data
     * 
     * **/
        this.route.paramMap.subscribe(params => {
          this.id = params.get('id');
          if (this.id) {
            this.getVendorRecoedById()
          }
        });
          /**
           * 
         * Check page is EDIT and Patch data
         * 
         * **/
  }

  get f():{[key:string]:AbstractControl} {
    return this.VendorForm.controls
  }

  onSubmit(){
    
    this.VendorForm.value.logo =  (this.VendorForm.get('logo') as FormGroup)?.value?.file;
   
    let formdata = this.httpService.convertToFormData(this.VendorForm.value);

    if(this.id){
      try {
        this.httpService.updateData('vendor',this.id,formdata).subscribe((res:any)=>{
          console.log(res)
        },error=>{
          console.log(error)
        })
      } catch (error) {
        
      }
    } else {
      try {
        this.httpService.postData('vendor',formdata).subscribe((res:any)=>{
          console.log(res)
        },error=>{
          console.log(error)
        })
      } catch (error) {
        
      }
    }

  }

  getVendorRecoedById(){
    this.httpService.getData(`vendor/${this.id}`).subscribe((res:any)=>{
      delete res._id;
      delete res.isDeleted;
      delete res.createdAt;
      delete res.updatedAt;
      delete res.type;
      delete res.__v;
 
      if(res.logo){
        res.logo = { file : res.logo , preview : `${this.imageUrl}${res.logo}` }
      } else {
        res.logo = { file : '' , preview : '' }
      }
      //res.logo = res.logo || 
      console.log(res)
      
      this.VendorForm.setValue(res);

     
      
    },error=>{
      console.log(error)
    })
  }

  /**
   * File Upload Section
   * **/

  onFilesSelected(event: any) {
    const selectedFiles = event.target.files[0];
    if (selectedFiles) {
        const file = selectedFiles;
        const reader = new FileReader();
        reader.onload = (e: any) => {
         ( this.VendorForm.get('logo') as FormGroup).setValue({
            file : file,
            preview : e.target.result
         })
        };
        reader.readAsDataURL(file);
    }
  }
  /**
   * File Upload Section
   * **/
}
