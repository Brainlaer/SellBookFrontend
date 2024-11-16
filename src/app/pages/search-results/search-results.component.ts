import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router, RouterLink } from '@angular/router';
import { BookPreview } from 'src/app/models/book-preview';
import { Category } from 'src/app/models/category';
import { handleErrors } from '../helpers/handleerrors';
import { ToastService } from 'src/app/components/message/service/toast.service';
import { MainService } from 'src/app/services/main.service';

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



  constructor(
    private mainService:MainService, 
    private route:ActivatedRoute, 
    private router:Router,
    private toastService:ToastService
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
    this.mainService.getData('book').subscribe(
      {
        next: (categoryList:any)=>{
          this.categories=categoryList;
        },error:(error)=>{

        }
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
      this.mainService.getData('book/title&&author', this.stringSearch).subscribe(
        {
          next: (data:any)=>{
            this.bookPreviewList=data;
            this.booksFound=this.bookPreviewList;
            this.finishLoad();
          },error: (error)=>{
            handleErrors(error, this.toastService);
            this.finishLoad();
          }
        }

      )
  }

  findByCategory(){
    this.booksFound=[];
    this.mainService.getData('book/category',this.categorySearch).subscribe(
      {
        next: (data:any)=>{
          this.bookPreviewList=data.response;
          this.booksFound=this.bookPreviewList;
          this.finishLoad();
        },error: (error)=>{
          handleErrors(error, this.toastService);
          this.finishLoad();
        }
      }
    )
  }

}