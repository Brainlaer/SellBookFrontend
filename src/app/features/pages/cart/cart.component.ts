import { Component } from '@angular/core';
import { CartService } from './service/cart.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { DataView } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, DataViewModule, Tag, DataView]
})
export class CartComponent {
  noImage='assets/noimage.png'

  visibleSideBar:boolean=false;
  itemsHeader:any[]=[
    {label:'imagen',value:'image'},
    {label:'titulo',value:'title'},
    {label:'autor',value:'author'},
    {label:'costo',value:'cost'}
  ];
  itemsBody:any[]=this.cartService.getAll();
  // itemsActions:IAction={
  //   icon: '../../../assets/close.svg',
  //   severity: 'danger'
  // }
  totalCost$:Observable<number>=this.cartService.getTotal();
  totalCostLength=String(this.cartService.costo.value);


  constructor(
    private cartService:CartService,
    private router:Router
  ){
  }
  removefromCart(id:number){
    this.cartService.removeOne(id);
  }
  cleanCart(){
    if(this.itemsBody.length>0){
      this.cartService.removeAll();
      this.itemsBody=this.cartService.getAll();
    }else{
      // this.toastService.showMessage(
      //   'warning',
      //   'Cart',
      //   'No hay elementos a remover.'
      // )
    }
  }
  goToPay(){
    if(this.itemsBody.length==0){
      // this.toastService.showMessage(
      //   'warning',
      //   'Cart',
      //   'Primero añade algunos elementos al carrito.'
      // )
    }else if(String(sessionStorage.getItem('token')).length==0){
      this.router.navigateByUrl('/iniciar_session');
      // this.toastService.showMessage(
      //   'warning',
      //   'Cart',
      //   'Por favor, inicia sessión.'
      // )
      this.visibleSideBar=false;
    }else{
      this.router.navigateByUrl('/billing');
      this.visibleSideBar=false;

    }
  }
  showHideCart(){
    if(this.visibleSideBar==true){
      this.visibleSideBar=false
    } else{
      this.visibleSideBar=true
    }
  }

}
