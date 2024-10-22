import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router, RouterLink } from '@angular/router';
import { catchError, filter } from 'rxjs';
import { BookPreview } from 'src/app/models/book-preview';
import { FiltrosDataService } from 'src/app/services/filtros-data.service';
import { BookService } from 'src/app/services/book.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { handleErrors } from '../helpers/handleerrors';
import { ToastMessageService } from 'src/app/components/message/service/toast-message.service';

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
  bookPreviewList:BookPreview[]=[];
  booksFound:any[]=[];
  hiddenLoad:boolean=true;
  hiddenTable:boolean=false;
  hiddenEmpty:boolean=true;



  constructor(private bookService:BookService,
    private categoryService:CategoryService, 
    private route:ActivatedRoute, 
    private router:Router,
    private toastMessageService:ToastMessageService
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

  finishLoad(){
    if(this.booksFound.length>0){
      this.hiddenEmpty=true;
      this.hiddenTable=false;
      this.hiddenLoad=true;

    }else{
      this.hiddenEmpty=false;
      this.hiddenTable=true;
      this.hiddenLoad=true;

    }
  }
  startLoad(){
      this.hiddenEmpty=true;
      this.hiddenTable=true;
      this.hiddenLoad=false;

    
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
    this.startLoad();
    if(this.stringSearch&&this.categorySearch==0){
      this.findByAuthorYTitlePreview();
    }else if(!this.stringSearch&&this.categorySearch!=0){
      this.findByCategory();
    }
  }

  findByAuthorYTitlePreview(){
    this.booksFound=[];
      this.bookService.findByAuthorYTitlePreview(this.stringSearch).subscribe(
        (data:any)=>{
          this.bookPreviewList=data;
          this.booksFound=this.bookPreviewList;
          this.finishLoad();
        },(error)=>{
          handleErrors(error, this.toastMessageService);
          this.finishLoad();
        }
      )
  }

  findByCategory(){
    this.booksFound=[];
    this.bookService.findByCategory(this.categorySearch).subscribe(
      (data:any)=>{
        this.bookPreviewList=data.response;
        this.booksFound=this.bookPreviewList;
        this.finishLoad();
      },(error)=>{
        handleErrors(error, this.toastMessageService);
        this.finishLoad();
      }
    )
  }

}