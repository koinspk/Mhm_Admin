import { Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
   {
    path : "",
    component : AppComponent,
    children : [
            {
                path : "login",
                component : LoginComponent
            },
           {
            path : '',
            loadChildren : () => import("./pages/layout/layout.module").then(c=>c.LayoutModule)
           }
            
       
    ]
   }
];
