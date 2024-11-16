import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLinkActive } from '@angular/router';
import { Book } from 'src/app/models/book-view';
import { MainService } from 'src/app/services/main.service';
import { handleErrors } from '../helpers/handleerrors';
import { ToastService } from 'src/app/components/message/service/toast.service';

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
  book!:Book;


  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private mainService:MainService,
    private toastService:ToastService
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

  getmostRelevants(){
    this.mainService.getData('book/title&&author/'+this.book?.author).subscribe(
      {
        next: (data:any)=>{
          this.moreBooks=data.response;
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
