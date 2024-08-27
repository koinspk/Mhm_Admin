import { Routes, RouterModule } from '@angular/router';
import { VendorComponent } from './vendor.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { 
    path : "",
    component : VendorComponent
   },
   {
    path : "form",
    component : FormComponent
   }
];

export const VendorRoutes = RouterModule.forChild(routes);
