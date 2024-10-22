import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router, RouterLink } from '@angular/router';
import { catchError, filter } from 'rxjs';
import { BookPreview } from 'src/app/models/book-preview';
import { FiltrosDataService } from 'src/app/services/filtros-data.service';
import { BookService } from 'src/app/services/book.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit{

  category:Category={id:0,name:''};
  categories:Category[]=[];
  stringSearch:string|null='';
  categorySearch:number|null=0;
  noBooks=false;
  bookPreviewList:BookPreview[]=[];



  constructor(private bookService:BookService,
    private categoryService:CategoryService, 
    private route:ActivatedRoute, 
    private router:Router,
  ){
  }
 goToViewBook(isxn:number){
    window.location.href="/view_book/"+isxn;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.categorySearch=params['category'];
      this.stringSearch=params['string'];
      this.onSearch();
    });    
    this.findAllCategories();
  }

  goSearchingByCategory(category:number){
    this.router.navigate(['/search_results'],{queryParams:{category:category, string:this.stringSearch}})
  }

  allCategories(){
    this.router.navigate(['/search_results'],{queryParams:{category:0, string:this.stringSearch}})
  }


  findAllCategories(){
    this.categoryService.findAll().subscribe(
      (categoryList:any)=>{
        this.categories=categoryList;
      }
    )
  }

  onSearch(){
    if(this.stringSearch&&this.categorySearch==0){
      this.findByAuthorYTitlePreview();
    }else if(!this.stringSearch&&this.categorySearch!=0){
      this.findByCategory();
    }
    this.cantidadLibros();
  }

  cantidadLibros(){
    if(this.bookPreviewList==null){
      return this.noBooks=true;
    }
    else{
      return this.noBooks=false;
    }
  }

  findByAuthorYTitlePreview(){
      this.bookService.findByAuthorYTitlePreview(this.stringSearch).subscribe(
        (data:any)=>{
          this.bookPreviewList=data;
        }
      )
  }

  findByCategory(){
    this.bookService.findByCategory(this.categorySearch).subscribe(
      (data:any)=>{
        this.bookPreviewList=data.response;
      }
    )
  }

}