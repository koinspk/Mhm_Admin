import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { RouterOutlet } from '@angular/router';
import { SidemenuService } from '../../services/sidemenu.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  standalone : true,

  imports: [
    CommonModule,
    RouterOutlet ,HeaderComponent , FooterComponent,SidemenuComponent],
})
export class LayoutComponent implements OnInit {
  isSidebarOpen = false;
  constructor(public sidemenuService : SidemenuService ) { }

  ngOnInit() {
    this.sidemenuService.isCollapsed$.subscribe(isCollapsed => {
      this.isSidebarOpen = isCollapsed;
    });
  }

  toggleSidebar(){
    this.sidemenuService.toggle();
  
  }

}
