import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router, RouterLink } from '@angular/router';
import { BookPreview } from 'src/app/models/book-preview';
import { Category } from 'src/app/models/category';
import { handleErrors } from '../../helpers/handleerrors';
import { ToastService } from 'src/app/components/message/service/toast.service';
import { MainService } from 'src/app/services/main.service';
import { HttpParams } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit{

  limitParam:string='50';
  offsetParam:string='0';

  books:any[]=[];
  filterForm!:FormGroup;
  currentCategory!:any;


  categories:Category[]=[];
  stringSearch:string|null='';
  hiddenLoad:boolean=true;
  hiddenTable:boolean=false;
  hiddenEmpty:boolean=true;



  constructor(
    private mainService:MainService, 
    private route:ActivatedRoute, 
    private router:Router,
    private toastService:ToastService,
    private fb:FormBuilder
  ){
    this.filterForm=fb.group({
      category: new FormControl(''),
      title: new FormControl(''),
      author: new FormControl(''),
      editorial: new FormControl(''),
      isxn: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.filterForm.patchValue({
        'category':params['category'],
        'title':params['title'],
        'author':params['author'],
        'editorial':params['editorial'],
        'isxn':params['isxn'],
      })
      this.currentCategory=this.categories.find((category)=>category.id==Number(this.filterForm.get('category')?.value))||{name:'Todos los generos'};
      this.findBooks();
    });    
    this.findAllCategories();
  }

  goToViewBook(isxn:number){
    window.location.href="/view_book/"+isxn;
  }





  finishLoad(){
    if(this.books.length>0){
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

  goToFindByCategory(category:number){
    this.router.navigate(['/search_results'],{queryParams:{category:category, title:this.filterForm.get('title')?.value}})
  }

  allCategories(){
    this.router.navigate(['/search_results'],{queryParams:{category:'', title:this.filterForm.get('title')?.value}})
  }


  findAllCategories(){
    this.mainService.getData('category').subscribe({
        next: (response:any)=>{
          this.categories=response.detail;

        },error:(error)=>{
          handleErrors(error, this.toastService);
        }
      })
  }

  onSearch(){
    this.startLoad();
  }

  findBooks() {
    let params = new HttpParams();
    if(this.filterForm.get('isxn')?.value)params = params.append('isxn', this.filterForm.get('isxn')?.value);
    if(this.filterForm.get('author')?.value)params = params.append('author', this.filterForm.get('author')?.value);
    if(this.filterForm.get('editorial')?.value)params = params.append('editorial', this.filterForm.get('editorial')?.value);
    if(this.filterForm.get('title')?.value)params = params.append('title', this.filterForm.get('title')?.value);
    if(this.filterForm.get('category')?.value)params = params.append('category', this.filterForm.get('category')?.value);
    params = params.append('limit', this.limitParam);
    params = params.append('offset', this.offsetParam);

    this.mainService.getData('book', params).subscribe({
      next: (response: any) => {
        this.books = response.content;
        console.log(this.books)
      }, error: (error) => {
        handleErrors(error, this.toastService);
      }
    })
  }

}