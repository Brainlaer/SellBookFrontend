import { Component, OnInit } from '@angular/core';
import { LibroService } from 'src/app/services/libro.service';
import { libroDto } from 'src/app/models/libro-dto';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  ngOnInit(): void {
    this.librosRecientes();
    this.allCategies();
  }


  constructor(private libroService:LibroService, private categoryService:CategoryService){

  }

  categories:Category[]=[];


  librosDto:libroDto[]=[];


  librosRecientes(){
    this.libroService.librosRecientes().subscribe(
      (data:any)=>{
        this.librosDto=data;
      },(error)=>{
        console.log(error);
      }
    )
  }

  allCategies(){
    this.categoryService.getAllCategories().subscribe(
      (data:any)=>{
        this.categories=data;
      },(error)=>{
        console.log(error);
      }
    )
  }
  
}
