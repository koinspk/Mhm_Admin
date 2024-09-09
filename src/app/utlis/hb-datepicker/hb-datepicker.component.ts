import { ChangeDetectorRef, Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControl, FormControlName, FormGroupDirective, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbDate, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { subscribe } from 'diagnostics_channel';
import moment from 'moment';


@Component({
  selector: 'app-hb-datepicker',
  templateUrl: './hb-datepicker.component.html',
  styleUrls: ['./hb-datepicker.component.css'],
  standalone:true,
  imports: [NgbDatepickerModule, NgbAlertModule , ReactiveFormsModule],
  viewProviders:[{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class HbDatepickerComponent implements OnChanges  {
  @Input() control: AbstractControl = new FormControl();
  referenceControl:any;
  private isUpdating = false; 
  constructor(private cdr: ChangeDetectorRef) { 
   this.referenceControl = this.control;
  }

  ngOnChanges(changes: SimpleChanges): void {
     if (changes['control'] && this.control) {
   
      this.referenceControl.valueChanges.subscribe((value : any) => {
          let gg = this.formatDateObjectToString(value);
          const date = moment(gg, "DD-MM-YYYY").format('YYYY-MM-DD');
          this.control.setValue(date,{emitEvent : false})
          this.cdr.detectChanges();
      });

      // Invoke only first time
      this.control.valueChanges.subscribe((value : any) => {     
          const date = moment(value, "YYYY-MM-DD").format('DD-MM-YYYY');
          let dateObject = this.convertDateFormat(date);
          this.referenceControl.setValue(dateObject)
      })
    }
  }

  ngOnInit() {
    const date = moment(this.control.value, "YYYY-MM-DD").format('DD-MM-YYYY');
    let frmy = this.convertDateFormat(date);
    this.referenceControl.setValue(frmy)
  }

   formatDateObjectToString(dateObject: { year: number, month: number, day: number }): string {
    if(!dateObject.day){
      return "";
    }
    const day = String(dateObject.day).padStart(2, '0');
    const month = String(dateObject.month).padStart(2, '0');
    const year = dateObject.year;
  
    return `${day}-${month}-${year}`;
  }

  convertDateFormat(dateString: string): { year: number, month: number, day: number } | '' {
   
    const parts = dateString.split('-');

    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);

      return { year, month, day };
    }
    
   
    return '';
  }



}
