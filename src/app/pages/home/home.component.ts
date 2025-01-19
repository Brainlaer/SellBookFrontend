import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { BookPreview } from 'src/app/models/book-preview';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { ToastService } from 'src/app/components/message/service/toast.service';
import { handleErrors } from '../../helpers/handleerrors';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../cart/service/cart.service';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  categories:Category[]=[];
  booksCategories:any[]=[];
  bookPreviewList:BookPreview[]=[];

  constructor( 
    private mainService:MainService, 
    private router:Router,
    private toastService:ToastService
  ){}

  async ngOnInit(): Promise<void> {
    await this.findLastestBooks();
    await this.findCategories();
  }

  goSearchingById(isxn:number){
    window.location.href="/view_book/"+isxn;
  };

  goToFindByCategory(category:number){
    this.router.navigate(['/search_results'],{queryParams:{category:category}});
  };

  async findLastestBooks() {
    let params = new HttpParams();
    params = params.append('limit', 10);
    params = params.append('offset', 0);
    await this.mainService.getData('book',params).subscribe({
      next: (response: any) => {
        this.bookPreviewList = response.content;
      }, error: (error) => {
        handleErrors(error, this.toastService, 'Book');
      }
    });
  };

  async findCategories() {
    await this.mainService.getData('category').subscribe({
      next: (data: any) => {
        this.categories = data.detail;
        this.findBooksTopOnCategory();
      }, error: (error) => {
        handleErrors(error, this.toastService, 'Category');
      }
    })
  }

  async findBooksTopOnCategory(){
    this.categories.forEach(async (category)=>{
      let params = new HttpParams();
      params = params.append('category', category.id);
      params = params.append('limit', 10);
      params = params.append('offset', 0);

      await this.mainService.getData(`book`, params).subscribe({
          next:(response:any)=>{
            const seccion={'seccion':category.name,'data':response.content}
            this.booksCategories.push(seccion);
          },error:(error)=>{
            handleErrors(error, this.toastService, 'Book');
          }
        })
    })
  };


  
}
