import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { BookPreview } from 'src/app/models/book-preview';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  string:String='null';

  ngOnInit(): void {
    this.findLastest();
    this.findAll();
  }


  constructor(private bookService:BookService, 
    private categoryService:CategoryService, 
    private router:Router
  ){

  }

  categories:Category[]=[];


  bookPreviewList:BookPreview[]=[];

  goSearchingById(isxn:number){
    window.location.href="/view_book/"+isxn;
  }

  goSearchingByCategory(category:number){
    this.router.navigate(['/search_results'],{queryParams:{category:category, string:'null'}})
  }

  findLastest(){
    this.bookService.findLastest().subscribe(
      (data:any)=>{
        this.bookPreviewList=data;
      },(error)=>{
        console.log(error);
      }
    )
  }

  findAll(){
    this.categoryService.findAll().subscribe(
      (data:any)=>{
        this.categories=data;
      },(error)=>{
        console.log(error);
      }
    )
  }
  
}
