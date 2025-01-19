import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { merge } from 'rxjs';
import { SearchResultsComponent } from 'src/app/pages/search-results/search-results.component';
import { IAction } from '../table/model/action';
import { CartComponent } from 'src/app/pages/cart/cart.component';
import { ToastService } from '../message/service/toast.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  categoryParam!:string;
  titleParam!:string;
  authorParam!:string;
  editorialParam!:string;
  isxnParam!:string;
  limitParam:string='50';
  offsetParam:string='0';


  categorySearch!:number;
  username:string;
  token:string;
  visible:boolean=false;
  @ViewChild(CartComponent) cartComponent!: CartComponent;  
  constructor(
    private route:ActivatedRoute, 
    private router:Router,
    private renderer:Renderer2,
    private toastService:ToastService
  ){
      this.token=String(sessionStorage.getItem('token')||null);
      this.username=sessionStorage.getItem('username')?.split('@').at(0)||'Iniciar Sessión';
    }

  closeSession(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username')
    this.token='';
    this.username='';
    this.toastService.showMessage(
      'success',
      'Logout',
      'Sessión cerrada exitosamente'
    )
  }

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
    this.route.queryParams.subscribe(params=>{
      this.categoryParam=params['category'];
      this.titleParam=params['title'];
      this.authorParam=params['author'];
      this.editorialParam=params['editorial'];
      this.isxnParam=params['isxn'];
    });   
  }
  sendValues(string:any){
    this.getCategory();
    this.router.navigate(['/search_results'],{queryParams:{title:string,category:this.categoryParam}});
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
