import { Component, Input, OnInit } from '@angular/core';
import { PageningComponent } from "../pagening/pagening.component";

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [PageningComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit{
  

  @Input() data: any;


  ngOnInit(): void {
    console.log(this.data)
  }


  onPageChange(object:any): void {
    console.log(object)
  }

  draggedIndex: number | null = null;

  onDragStart(event: DragEvent, index: number): void {
    this.draggedIndex = index;
    const target = event.target as HTMLElement;
    target.classList.add('dragging');
  }

  onDragOver(event: DragEvent, index: number): void {
    event.preventDefault(); // Necessary for the drop event to fire
  }

  onDrop(event: DragEvent, index: number): void {
    event.preventDefault();
    if (this.draggedIndex !== null) {
      const draggedCol = this.data.columns[this.draggedIndex];
      this.data.columns.splice(this.draggedIndex, 1); // Remove the dragged column
      this.data.columns.splice(index, 0, draggedCol); // Insert it at the new position
      this.draggedIndex = null;
    }
    const target = event.target as HTMLElement;
    target.classList.remove('dragging');
    target.classList.add('dropped');
  }

}
