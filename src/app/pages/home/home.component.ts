import { Component, OnInit } from '@angular/core';
import { LibroService } from 'src/app/services/libro.service';
import { libroDto } from 'src/app/models/libro-dto';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  ngOnInit(): void {
    this.librosRecientes();
  }


  constructor(private libroService:LibroService){

  }


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
  
}
