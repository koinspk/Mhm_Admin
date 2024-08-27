import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidemenuService {
  private isCollapsedSource = new BehaviorSubject<boolean>(false);
  isCollapsed$ = this.isCollapsedSource.asObservable();

  constructor() { }

  toggle() {
    this.isCollapsedSource.next(!this.isCollapsedSource.value);
  }
  
}
