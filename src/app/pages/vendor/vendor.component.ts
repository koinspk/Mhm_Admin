import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css'],
  standalone : true,
  imports : [RouterModule]
})
export class VendorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
