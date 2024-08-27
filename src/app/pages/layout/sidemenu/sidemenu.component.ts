import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { SidemenuService } from '../../../services/sidemenu.service';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css'
})
export class SidemenuComponent  implements OnInit  {
  currentRoute!: string;

  constructor(public sidemenuService : SidemenuService , private router: Router, private activatedRoute: ActivatedRoute){
   
  }

  isCollapsed = true;

  ngOnInit() {
    this.sidemenuService.isCollapsed$.subscribe(isCollapsed => {
      this.isCollapsed = isCollapsed;
    });
  }

  isActive(route: string): boolean {
    route = `/${route}`

    return this.router.isActive(route,true)
  }

}
