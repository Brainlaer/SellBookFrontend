import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'br-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent implements OnInit{

  constructor(
    private router:Router
  ){}

  ngOnInit(): void {
    this.setScrollProperty();
  }

  @Input() items:any[]=[];
  @Input() scrollable:string='false';
  @Input() redirect:string='';
  scrollClass!:string;

  goSearchingById(id:string){
    this.router.navigate([this.redirect],{queryParams:{id:id}})
  }

  setScrollProperty(){
    if(this.scrollable=='true'){
      this.scrollClass='scroll-cards';
    }else{
      this.scrollClass='';
    }
  }
}
