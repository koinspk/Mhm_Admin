import { Component, OnInit } from '@angular/core';
import { SidemenuService } from '../../../services/sidemenu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
 standalone : true
})
export class HeaderComponent implements OnInit {

  constructor(public sidemenuService : SidemenuService) { }

  ngOnInit() {
  }

  toggleSidebar(){
  
    this.sidemenuService.toggle();
  }

}
