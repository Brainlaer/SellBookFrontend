import { Component, Input } from '@angular/core';
import { DataView } from 'primeng/dataview';
import { Tag } from 'primeng/tag';
import { Rating } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-data-view-scrollable',
  imports: [
    DataView,
    Tag,
    Rating,
    SelectButton,
    CommonModule,
    FormsModule,
    ButtonModule,
  ],
  standalone:true,
  templateUrl: './data-view-scrollable.component.html',
  styleUrl: './data-view-scrollable.component.css'
})
export class DataViewScrollableComponent {
  @Input() items!:any;
  noImage = 'assets/noimage.png'


  getSeverity(units: any) {
    if (units <= 0) {
      return 'danger';
    }
    else if (units > 5) {
      return 'success';
    } else {
      return 'warn';
    }
  }
  getTag(units: any) {
    if (units <= 0) {
      return 'OUTOFSTOCK';
    }
    else if (units > 5) {
      return 'INSTOCK';
    } else {
      return 'LOWSTOCK';
    }
  }
}
