import { Component } from '@angular/core';
import { IAction } from 'src/app/components/table/model/action';
import { CartService } from './service/cart.service';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/components/message/service/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  visibleSideBar:boolean=false;
  itemsHeader:any[]=[
    {label:'imagen',value:'image'},
    {label:'titulo',value:'title'},
    {label:'autor',value:'author'},
    {label:'costo',value:'cost'}
  ];
  itemsBody:any[]=this.cartService.getAll();
  itemsActions:IAction={
    icon: '../../../assets/close.svg',
    severity: 'danger'
  }
  totalCost$:Observable<number>=this.cartService.getTotal();
  totalCostLength=String(this.cartService.costo.value);


  constructor(
    private cartService:CartService,
    private toastService:ToastService,
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
      this.toastService.showMessage(
        'warning',
        'Cart',
        'No hay elementos a remover.'
      )
    }
  }
  goToPay(){
    if(this.itemsBody.length==0){
      this.toastService.showMessage(
        'warning',
        'Cart',
        'Primero añade algunos elementos al carrito.'
      )
    }else if(String(sessionStorage.getItem('token')).length==0){
      this.router.navigateByUrl('/iniciar_session');
      this.toastService.showMessage(
        'warning',
        'Cart',
        'Por favor, inicia sessión.'
      )
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
