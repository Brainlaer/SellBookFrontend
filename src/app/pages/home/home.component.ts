import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { BookPreview } from 'src/app/models/book-preview';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { ToastService } from 'src/app/components/message/service/toast.service';
import { handleErrors } from '../helpers/handleerrors';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../cart/service/cart.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  string:String='null';

  async ngOnInit(): Promise<void> {
    await this.findLastestBooks();
    await this.findCategories();
  }


  constructor( 
    private mainService:MainService, 
    private router:Router,
    private toastService:ToastService,
    private cartService:CartService
  ){

  }

  categories:Category[]=[];


  bookPreviewList:BookPreview[]=[];

  goSearchingById(isxn:number){
    window.location.href="/view_book/"+isxn;
  }

  goSearchingByCategory(category:number){
    this.router.navigate(['/search_results'],{queryParams:{category:category}})
  }

  async findLastestBooks(){
    await this.mainService.getData('book/recentlyadded').subscribe(
      {
        next:(data:any)=>{
          this.bookPreviewList=data.response;
        },error:(error)=>{
          handleErrors(error, this.toastService, 'Book');
        }
      }

    )
  }

  booksCategories:any[]=[];

  async findTopCategory(){
    this.categories.forEach(async (category)=>{
      await this.mainService.getData('book/topcategory/'+category.id).subscribe(
        {
          next:(data:any)=>{
            const seccion={'seccion':category.name,'data':data.response}
            this.booksCategories.push(seccion);
          },error:(error)=>{
          }
        }
  
      )
    })
  }

  async findCategories(){
    await this.mainService.getData('category').subscribe(
      {
        next:(data:any)=>{
          this.categories=data;
          this.findTopCategory();
        },error:(error)=>{
          handleErrors(error, this.toastService, 'Category');
        }
      }
    )
  }
  
}
