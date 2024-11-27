import { Component } from '@angular/core';
import { IAction } from 'src/app/components/table/model/action';
import { CartService } from './service/cart.service';
import { Observable } from 'rxjs';

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
    {label:'unidades',value:'units'},
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
    private cartService:CartService
  ){
  }
  removefromCart(id:number){
    this.cartService.removeOne(id);
  }
  cleanCart(){
    this.cartService.removeAll();
    this.itemsBody=this.cartService.getAll();
  }
  showHideCart(){
    if(this.visibleSideBar==true){
      this.visibleSideBar=false
    } else{
      this.visibleSideBar=true
    }
  }

}
