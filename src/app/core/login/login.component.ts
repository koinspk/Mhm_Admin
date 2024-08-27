import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public form !: FormGroup;

  constructor(){
    this.form = new FormGroup({
      email: new FormControl('', Validators.minLength(2)),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {
  
  }

  get f():{[key:string]:AbstractControl} {
    return this.form.controls
  }

  onSubmit(){
    if (this.form.valid) {
      console.log('Form Submitted!', this.form.value);
    }
  }
}
