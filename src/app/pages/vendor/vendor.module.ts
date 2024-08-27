import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorComponent } from './vendor.component';
import { VendorRoutes } from './vendor.routing';

@NgModule({
  imports: [
    CommonModule,
    VendorRoutes
  ]
  
})
export class VendorModule { }
