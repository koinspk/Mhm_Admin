import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagening',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './pagening.component.html',
  styleUrl: './pagening.component.css'
})
export class PageningComponent {

  @Input() totalItems!: number;
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<any>();
  @Output() itemsPerPageChange: EventEmitter<number> = new EventEmitter<number>();

  availableItemsPerPage: number[] = [5, 10, 25, 50, 100];
  selecteditemsPerPage :number = 5;
  pageThreshold: number = 5; // Threshold for showing ellipses
 
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  // get pages(): number[] {
  //   return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  // }

  get pages(): number[] {
    const pages: number[] = [];
    let startPage: number;
    let endPage: number;

    if (this.totalPages <= this.pageThreshold) {
      startPage = 1;
      endPage = this.totalPages;
    } else {
      if (this.currentPage <= Math.floor(this.pageThreshold / 2)) {
        startPage = 1;
        endPage = this.pageThreshold;
      } else if (this.currentPage + Math.floor(this.pageThreshold / 2) >= this.totalPages) {
        startPage = this.totalPages - this.pageThreshold + 1;
        endPage = this.totalPages;
      } else {
        startPage = this.currentPage - Math.floor(this.pageThreshold / 2);
        endPage = this.currentPage + Math.floor(this.pageThreshold / 2);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    console.log(pages)
    return pages;
  }

  get showStartEllipsis(): boolean {
    return this.totalPages > this.pageThreshold && this.currentPage > Math.ceil(this.pageThreshold / 2);
  }

  get showEndEllipsis(): boolean {
    return this.totalPages > this.pageThreshold && this.currentPage < this.totalPages - Math.floor(this.pageThreshold / 2);
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    let obj = {
      page : page,
      itemPerPage : this.selecteditemsPerPage
    }
    this.pageChange.emit(obj);
  
  }

  onPrevious(): void {
    if (this.currentPage > 1) {
      this.onPageChange(this.currentPage - 1);
    }
  }

  onNext(): void {
    if (this.currentPage < this.totalPages) {
      this.onPageChange(this.currentPage + 1);
    }
  }

  onItemsPerPageChange(newItemsPerPage: any): void {
    this.itemsPerPageChange.emit(newItemsPerPage);
    this.currentPage = 1;
    this.selecteditemsPerPage = newItemsPerPage;
    this.itemsPerPage = newItemsPerPage;
    this.onPageChange(this.currentPage);
  }
  
}
