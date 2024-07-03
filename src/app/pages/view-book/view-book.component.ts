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

  isxnGotten!:any;
  unitsToBuy:number=1;
  lessUnitsdisabled:boolean=false;

  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private bookService:BookService,
  ){}

  ngOnInit(): void {
    this.getIsxnBook();
    this.findByIsxn(this.isxnGotten);
    this.disablelessUnitsbutton();
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

  getIsxnBook(){
    this.activatedRoute.paramMap.subscribe(
      (params:ParamMap)=>{
        this.isxnGotten=params.get('isxn');
        console.log('isxn gotten'+this.isxnGotten)
      }
    )
  }
  findByIsxn(isxn:number){
    this.bookService.findByIsxn(isxn).subscribe(
      (book:any)=>{
        this.bookView=book;
        this.setCost(this.bookView.cost)
        console.log(this.bookView.cost)
      }
    )
  }

}
