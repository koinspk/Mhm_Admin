import { Routes, RouterModule } from '@angular/router';
import { RoleComponent } from './role.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { 
    path : "",
    component : RoleComponent
   },
   { 
    path : "add",
    component : FormComponent
   },
   { 
    path : "edit/:id",
    component : FormComponent
   },
];

export const RoleRoutes = RouterModule.forChild(routes);
