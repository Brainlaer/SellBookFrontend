import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { merge } from 'rxjs';
import { SearchResultsComponent } from 'src/app/pages/search-results/search-results.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  categorySearch!:number;
  username:string='';
  token:string;
  visible:boolean=false;

  constructor(
    private route:ActivatedRoute, 
    private router:Router,
    private renderer:Renderer2){
      this.token=String(sessionStorage.getItem('token')||null);
      this.username=String(sessionStorage.getItem('username')?.split('@').at(0));
    }

  searchForm=new FormGroup({
    string:new FormControl('',Validators.required)
  });

  @ViewChild('spandible', { static: false }) divspandible!: ElementRef;
  @ViewChild('showSpandible', { static: false }) imgspandible!: ElementRef;

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
    if(this.visible==true){
      this.renderer.setStyle(this.divspandible.nativeElement, 'display', 'none');
      this.renderer.setStyle(this.imgspandible.nativeElement, 'transform', 'rotate(0.0turn)')
      this.visible=false
    } else{
      this.renderer.setStyle(this.divspandible.nativeElement, 'display', 'flex');
      this.renderer.setStyle(this.imgspandible.nativeElement, 'transform', 'rotate(0.5turn)');
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
      this.renderer.setStyle(this.divspandible.nativeElement, 'display', 'none');
      this.renderer.setStyle(this.imgspandible.nativeElement, 'transform', 'rotate(0.0turn)');
      this.visible = false;
    }
  }

}
