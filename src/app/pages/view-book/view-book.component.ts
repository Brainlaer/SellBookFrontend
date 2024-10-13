import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLinkActive } from '@angular/router';
import { BookView } from 'src/app/models/book-view';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit{

  id!:any;
  unitsToBuy:number=1;
  lessUnitsdisabled:boolean=false;
  moreBooks:any[]=[]

  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private bookService:BookService,
  ){}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(
      (params:ParamMap)=>{
        this.id=params.get('id');
      }
    )
    this.findByIsxn();
    this.disablelessUnitsbutton();
  }

  mostRelevants(){
    this.bookService.findByAuthorYTitlePreview(String(this.bookView?.author)).subscribe(
      (books:any)=>{
        this.moreBooks=books;
      }
    )
  }
  bookView!:BookView;

  setCost(getCost:any){
    let co:string=getCost.toString();
    for(let i=0;i<co.length;i++){
        co.at(i)?.concat('3');
    }
    return console.log(co+"cost");
}
  moreUnits(){
    this.unitsToBuy++;
    this.disablelessUnitsbutton();
  }
  lessUNits(){
    if(this.unitsToBuy>1){
      this.unitsToBuy--;
    }
    this.disablelessUnitsbutton();
  }
  disablelessUnitsbutton(){
    if(this.unitsToBuy<=1){
      this.lessUnitsdisabled=true;
    }else{
      this.lessUnitsdisabled=false;
    }
  }
  findByIsxn(){
    this.bookService.findByIsxn(this.id).subscribe(
      (book:any)=>{
        this.bookView=book;
        this.setCost(this.bookView?.cost);
        this.mostRelevants();
      }
    )
  }

}
