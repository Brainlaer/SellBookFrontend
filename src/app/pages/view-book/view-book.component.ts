import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLinkActive } from '@angular/router';
import { Book } from 'src/app/models/book-view';
import { MainService } from 'src/app/services/main.service';
import { handleErrors } from '../helpers/handleerrors';
import { ToastService } from 'src/app/components/message/service/toast.service';
import { CartService } from '../cart/service/cart.service';

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
  @ViewChild('title') bookTitle?: ElementRef;
  book:Book={
    isxn: 0,
    title: '',
    publicationDate: 0,
    units: 0,
    editorial: '',
    cost: '',
    author: '',
    image: '',
    category:{
      id: 0,
      name: ''
    }
  };


  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private mainService:MainService,
    private toastService:ToastService,
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
    this.mainService.getData('book/title&&author/'+this.book?.author).subscribe(
      {
        next: (data:any)=>{
          this.moreBooks=data.response;
          this.moreBooks=this.moreBooks.filter((data:any)=>{
            return data.isxn!=this.id;
          })
        },error:(error)=>{
          handleErrors(error, this.toastService);
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
          this.book=data.response;
          this.getmostRelevants();
          window.scrollTo(0, 0);
        },error: (error)=>{
          handleErrors(error, this.toastService)
        }
      }
    )
  }

}
