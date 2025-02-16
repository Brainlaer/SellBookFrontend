import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLinkActive } from '@angular/router';
import { Book, BookGet } from 'src/app/core/models/book-view';
import { CartService } from '../cart/service/cart.service';
import { MainService } from 'src/app/core/services/main.service';

@Component({
    selector: 'app-view-book',
    templateUrl: './view-book.component.html',
    styleUrls: ['./view-book.component.css'],
    standalone: false
})
export class ViewBookComponent implements OnInit{

  id!:any;
  unitsToBuy:number=1;
  lessUnitsdisabled:boolean=false;
  moreBooks:any[]=[];
  noImage:string="../../../assets/noimage.png";
  @ViewChild('title') bookTitle?: ElementRef;
  book:BookGet={
    isxn: 0,
    title: '',
    publicationDate: 0,
    units: 0,
    editorial: '',
    cost: '',
    author: '',
    image: '',
    category:{
      id:'',
      name:''
    }
  };


  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private mainService:MainService,
    private cartService:CartService
  ){}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(
      (params:ParamMap)=>{
        this.id=params.get('id');
        this.findById();
        this.unitsToBuy=1;
      }
    )

  }
  addToCart(item:any){
    this.cartService.addOne(item, this.unitsToBuy);
  }

  getmostRelevants(){
    this.mainService.getData('book?filterBy=AUTHOR&limit=10&offset=0&filter='+this.book?.author).subscribe(
      {
        next: (data:any)=>{
          this.moreBooks=data.detail;
          this.moreBooks=this.moreBooks.filter((data:any)=>{
            return data.id!=this.id;
          })
        },error:(error)=>{
          // handleErrors(error, this.toastService);
        }
      }
    )
  }

  moreUnits(){
    this.unitsToBuy++;
  }
  lessUNits(){
    this.unitsToBuy--;
  }
  findById(){
    this.mainService.getData('book/'+this.id).subscribe(
      {
        next: (data:any)=>{
          this.book=data.detail;
          console.log(data)
          this.getmostRelevants();
          window.scrollTo(0, 0);
        },error: (error)=>{
          // handleErrors(error, this.toastService)
        }
      }
    )
  }

}
