import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/service/cart.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent  implements OnInit{

  items: any[] = this.cartService.getAll();

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {

  }

}
