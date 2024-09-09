import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [
  { 
    path : "",
    component : LayoutComponent,
    children : [{
      path : "",
      title : 'dashboard',
      component : DashboardComponent
    },
    {
      path : "vehicle",
      title : 'vehicle',
      loadChildren:()=>import("../vehicle/vehicle.module").then(m=>m.VehicleModule)
    },
    {
      path : "vendor",
      title : 'vendor',
      loadChildren:()=>import("../vendor/vendor.module").then(m=>m.VendorModule)
    },
    {
      path : "role",
      title : 'Role',
      loadChildren:()=>import("../role/role.module").then(m=>m.RoleModule)
    }
  ]
   },
  
];

export const LayoutRoutes = RouterModule.forChild(routes);
