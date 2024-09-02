import { Routes, RouterModule } from '@angular/router';
import { VehicleComponent } from './vehicle.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { 
    path : "",
    component : VehicleComponent,
   },
   {
    path : "add",
    component : FormComponent
  },
  {
    path : "edit/:id",
    component : FormComponent
  }
];

export const VehicleRoutes = RouterModule.forChild(routes);
