import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/service/cart.service';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-billing',
    templateUrl: './billing.component.html',
    styleUrls: ['./billing.component.css'],
    standalone: false
})
export class BillingComponent  implements OnInit{

  items: any[] = this.cartService.getAll();
  address:string='';
  delivery:string='';
  email:string='';
  active:number=0;
  steps:MenuItem[]=[
    {label:    'informacion'
    },
    {label:' Dirección de envío'},
    {label:' Método de envío'},
    {label:' Forma de pago'},
    {label:'Rebicion y aprobacion'}
  ];

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

}
