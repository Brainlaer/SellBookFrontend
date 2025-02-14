import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { DataView } from 'primeng/dataview';
import { Tag } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { paginationDto } from 'src/app/core/models/pagination.dto';
@Component({
  selector: 'app-data-view',
  imports: [
    DataViewModule,
    DataView,
    Tag,
    ButtonModule,
    CommonModule
  ],
  standalone: true,
  templateUrl: './data-view.component.html',
  styleUrl: './data-view.component.css'
})
export class DataViewComponent {



  @Input() items!: paginationDto;
  @Input() rows: number = 10;
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
