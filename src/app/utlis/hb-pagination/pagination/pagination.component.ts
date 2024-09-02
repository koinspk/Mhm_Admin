import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageningComponent } from "../pagening/pagening.component";
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { DateformatPipe } from '../../../pipes/dateformat.pipe';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [PageningComponent , DateformatPipe],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit{
  
  constructor(private router: Router, private route: ActivatedRoute){}

  @Input() data: any;
  @Output() onPagination = new EventEmitter<string>();


  ngOnInit(): void {
    console.log(this.data)
  }


  onPageChange(object:any): void {
    this.onPagination.emit(object);
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

  onViewDetails(path :String, id : any){

    let url = `${path}/${id}`;
    this.router.navigate([url], {relativeTo: this.route});
   }

   hasKey(data:any): boolean {
    return 'action' in data !;
  }

}
