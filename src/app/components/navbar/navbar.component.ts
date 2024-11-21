import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { merge } from 'rxjs';
import { SearchResultsComponent } from 'src/app/pages/search-results/search-results.component';
import { IAction } from '../table/model/action';
import { CartComponent } from 'src/app/pages/cart/cart.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  categorySearch!:number;
  username:string;
  token:string;
  visible:boolean=false;
  @ViewChild(CartComponent) cartComponent!: CartComponent;  
  constructor(
    private route:ActivatedRoute, 
    private router:Router,
    private renderer:Renderer2){
      this.token=String(sessionStorage.getItem('token')||null);
      this.username=sessionStorage.getItem('username')?.split('@').at(0)||'Iniciar Sessión';
    }

  searchForm=new FormGroup({
    string:new FormControl('',Validators.required)
  });

  onClickUser(){
    if(sessionStorage.getItem('token')){
      this.router.navigate(['/profile'],{queryParams:{id:String(sessionStorage.getItem('username'))}})
    }else{
      this.router.navigateByUrl('iniciar_session')
    }
  }
  @ViewChild('spandible', { static: false }) divspandible!: ElementRef;
  @ViewChild('showSpandible', { static: false }) imgspandible!: ElementRef;

  onShowHideCart(){
    this.cartComponent.showHideCart();
  }
  getCategory(){
    this.route.queryParams.subscribe(
      params=>{
        this.categorySearch=params['category'];
      }
    );
  }
  sendValues(){
    this.getCategory();
    this.router.navigate(['/search_results'],{queryParams:{category:this.categorySearch, string:this.searchForm.value.string}});
  }
  
  showHide(){
    console.log(this.visible)
    if(this.visible==true){
      this.renderer.removeStyle(this.divspandible?.nativeElement, 'display');
      this.renderer.removeStyle(this.imgspandible?.nativeElement, 'transform')
      this.visible=false
    } else{
      this.renderer.setStyle(this.divspandible?.nativeElement, 'display', 'flex');
      this.renderer.setStyle(this.imgspandible?.nativeElement, 'transform', 'rotate(0.5turn)');
      this.visible=true
    }
  }



  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (
      this.visible &&
      this.divspandible &&
      !this.divspandible.nativeElement.contains(event.target) &&
      !this.imgspandible.nativeElement.contains(event.target)
    ) {
      this.renderer.removeStyle(this.divspandible.nativeElement, 'display');
      this.renderer.removeStyle(this.imgspandible.nativeElement, 'transform');
      this.visible = false;
    }
  }



}
