import { Component } from '@angular/core';
import { IAction } from 'src/app/components/table/model/action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  visibleSideBar:boolean=false;
  itemsHeader:string[]=[
    'image',
    'titulo',
    'autor',
    'costo'
  ];
  itemsBody:any[]=[
    {image:'fdfdfdff', titulo:'dfdfdf', autor:'dsfdf', costo:'43435'}
  ];
  itemsActions:IAction={
    icon: '../../../assets/close.svg',
    severity: 'danger'
  }
  removefromCart(id:number){
    console.log(id);
  }
  showHideCart(){
    if(this.visibleSideBar==true){
      this.visibleSideBar=false
    } else{
      this.visibleSideBar=true
    }
  }

}
