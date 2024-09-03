import { Routes, RouterModule } from '@angular/router';
import { VehicleComponent } from './vehicle.component';
import { FormComponent } from './form/form.component';
import { ViewComponent } from './view/view.component';

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
  },
  {
    path : "view/:id",
    component : ViewComponent
  }
];

export const VehicleRoutes = RouterModule.forChild(routes);
