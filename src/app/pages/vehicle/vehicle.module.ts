import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleComponent } from './vehicle.component';
import { VehicleRoutes } from './vehicle.routing';

@NgModule({
  imports: [
    CommonModule,
    VehicleRoutes
  ]
})
export class VehicleModule { }
