import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpserviceService } from '../../../services/httpservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  standalone : true,
  imports : [ReactiveFormsModule]
})
export class FormComponent implements OnInit {

  RoleForm !: FormGroup;
  id: any;

  constructor(
    private fb: FormBuilder , 
    private httpService : HttpserviceService,
    private route: ActivatedRoute,
  ) { 
    this.RoleForm = this.fb.group({
      name : ['', [Validators.required, Validators.minLength(5)]],
      description : [''],
    });
  }

  ngOnInit() {

 

        /**
     * 
     * Check page is EDIT and Patch data
     * 
     * **/
        this.route.paramMap.subscribe(params => {
          this.id = params.get('id');
          if (this.id) {
            this.getRoleRecordById()
          }
        });
          /**
           * 
         * Check page is EDIT and Patch data
         * 
         * **/
    
  }

  get f():{[key:string]:AbstractControl} {
    return this.RoleForm.controls
  }

  getRoleRecordById(){
    this.httpService.getData(`role/${this.id}`).subscribe((res:any)=>{
      delete res._id;
      delete res.isDeleted;
      delete res.createdAt;
      delete res.updatedAt;
      delete res.__v;
 
      this.RoleForm.setValue(res);

    },error=>{
      console.log(error)
    })
  }

  onSubmit(){
    let formdata = this.RoleForm.value;
    if(this.id){
      try {
        this.httpService.updateData('role',this.id,formdata).subscribe((res:any)=>{
          console.log(res)
        },error=>{
          console.log(error)
        })
      } catch (error) {
        
      }
    } else {
      try {
        this.httpService.postData('role',formdata).subscribe((res:any)=>{
          console.log(res)
        },error=>{
          console.log(error)
        })
      } catch (error) {
        
      }
    }
  }

}
