import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButton } from 'primeng/radiobutton';
import { InputNumber } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-filters',
  imports: [
      AccordionModule,
      CheckboxModule,
      RadioButton,
      InputNumber,
      FormsModule,
      CommonModule,
      ReactiveFormsModule,
      FloatLabel,
      ButtonModule
  ],
  standalone:true,
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {

  @Input() categories!:any;
  selectedCategory:any;
  min!:number;
  max!:number;
  filterForm!:FormGroup;
  
   constructor(
     private fb:FormBuilder
   ){
     this.filterForm=fb.group({
       category: new FormControl(''),
       title: new FormControl(''),
       author: new FormControl(''),
       editorial: new FormControl(''),
       isxn: new FormControl('')
     })
   }
}
