import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { merge } from 'rxjs';
import { SearchResultsComponent } from 'src/app/pages/search-results/search-results.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  categorySearch!:number;
  username:string='';
  token:string='';

  constructor(private route:ActivatedRoute, 
    private router:Router){
      this.token=String(sessionStorage.getItem('token'));
      const user=sessionStorage.getItem('username')?.split('@');
      this.username=String(user?.at(0)||'Iniciar Sessión');
    }

  searchForm=new FormGroup({
    string:new FormControl('',Validators.required)
  });

  getCategory(){
    this.route.queryParams.subscribe(
      params=>{
        this.categorySearch=params['category'];
      }
    );
  }
  sendValues(){
    this.getCategory();
    this.router.navigate(['/search_results'],{queryParams:{category:this.categorySearch, string:this.searchForm.value.string}});
  }



  

}
