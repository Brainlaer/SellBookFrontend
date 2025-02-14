import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataView } from 'primeng/dataview';
import { Tag } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from 'src/app/features/pages/cart/service/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-data-view-scrollable',
  imports: [
    DataView,
    Tag,
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

  constructor(
    private cartService:CartService,
    private router:Router
  ){

  }
  

  addToCart(item:any){
    this.cartService.addOne(item);
  }


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
  goToViewDetails(id:number){
    this.router.navigateByUrl(`/view_book/${id}`)
  };
}
