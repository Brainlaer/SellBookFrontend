import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { BookPreview } from 'src/app/models/book-preview';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { ToastService } from 'src/app/components/message/service/toast.service';
import { handleErrors } from '../helpers/handleerrors';


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
    private toastService:ToastService
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
    await this.mainService.getData('book').subscribe(
      {
        next:(data:any)=>{
          this.bookPreviewList=data.response;
        },error:(error)=>{
          handleErrors(error, this.toastService, 'Book');
        }
      }

    )
  }

  async findCategories(){
    await this.mainService.getData('category').subscribe(
      {
        next:(data:any)=>{
          this.categories=data;
        },error:(error)=>{
          handleErrors(error, this.toastService, 'Category');
        }
      }
    )
  }
  
}
