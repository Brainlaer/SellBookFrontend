import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category';
import { BookPreview } from 'src/app/core/models/book-preview';
import { Params, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { MainService } from 'src/app/core/services/main.service';
import { noImage } from 'src/app/core/utils/constants';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {

  categories:Category[]=[];
  categoriesBooks:any[]=[];
  booksPreview:BookPreview[]=[];

  constructor( 
    private mainService:MainService, 
    private router:Router,
  ){  }

  async ngOnInit(): Promise<void> {
    await this.findLastestBooks();
    await this.findCategories();
    await this.findBooksTopOnCategory();

  }

  onNoImage(){
    return noImage;
  }

  navigate(uri:string,queryParams?:Params){
    this.router.navigate([uri],{queryParams:queryParams});
  };

  async findLastestBooks() {
    let params = new HttpParams();
    params = params.append('limit', 10);
    params = params.append('offset', 0);
    await this.mainService.getData('book',params).subscribe({
      next: (response: any) => {
        this.booksPreview = response.content;
      }, error: (error) => {
      }
    });
  };

  async findCategories():Promise<any> {
    console.log(' await')

    await this.mainService.getData('category').subscribe({
      next: (data: any) => {
        return this.categories = data.detail;
      }, error: (error) => {
        // handleErrors(error, this.toastService, 'Category');
      }
    })
  }

  async findBooksTopOnCategory(){
    console.log('no await')
    this.categories.forEach(async (category)=>{
      let params = new HttpParams();
      params = params.append('category', category.id);
      params = params.append('limit', 10);
      params = params.append('offset', 0);

      await this.mainService.getData(`book`, params).subscribe({
          next:(response:any)=>{
            if(Array(response.content).length>0){
              const categoryBooks={'categoryName':category.name,'books':response.content}
              return this.categoriesBooks.push(categoryBooks);
            }else{
              return console.warn(`La categoría ${category.name}, esta vacía`)
            }
          },error:(error)=>{
            return console.error(`La categoría ${category.name}, no se encontró`)
          }
        })
    })
  };


  
}
