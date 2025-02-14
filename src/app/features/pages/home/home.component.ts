import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category';
import { BookPreview } from 'src/app/core/models/book-preview';
import { Params, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { HandleErrors } from 'src/app/core/utils/handleerrors';
import { MessageService } from 'primeng/api';
import { MainService } from 'src/app/core/services/main.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent extends HandleErrors implements OnInit {

  categories:Category[]=[];
  categoriesBooks:any[]=[];
  booksPreview:BookPreview[]=[];

  constructor( 
    private mainService:MainService, 
    private router:Router,
  ){
    super();
  }

  async ngOnInit(): Promise<void> {
    await this.findLastestBooks();
    await this.findCategories();
  }


  navigate(uri:string,queryParams?:Params){
    this.router.navigate([uri],{queryParams:queryParams});
  };
  
  // getSeverity(units:any){
  //   if(units<=0){
  //     return 'danger';
  //   }
  //   else if(units>5){
  //     return 'success';
  //   }else{
  //     return 'warn';
  //   }
  // }

  // getTag(units:any){
  //   if(units<=0){
  //     return 'OUTOFSTOCK';
  //   }
  //   else if(units>5){
  //     return 'INSTOCK';
  //   }else{
  //     return 'LOWSTOCK';
  //   }
  // }

  async findLastestBooks() {
    let params = new HttpParams();
    params = params.append('limit', 10);
    params = params.append('offset', 0);
    await this.mainService.getData('book',params).subscribe({
      next: (response: any) => {
        this.booksPreview = response.content;
      }, error: (error) => {
        this.handleErrors(error, 'Book');
      }
    });
  };

  async findCategories() {
    await this.mainService.getData('category').subscribe({
      next: (data: any) => {
        this.categories = data.detail;
        this.findBooksTopOnCategory();
      }, error: (error) => {
        // handleErrors(error, this.toastService, 'Category');
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
            this.categoriesBooks.push(seccion);
          },error:(error)=>{
            // handleErrors(error, this.toastService, 'Book');
          }
        })
    })
  };


  
}
