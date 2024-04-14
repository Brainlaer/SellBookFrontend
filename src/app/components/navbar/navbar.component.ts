import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  
  constructor(private route:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
    this.clickTitulo();


    this.route.paramMap.subscribe((params: ParamMap) => {
      // Obtener los valores de los parámetros de la URL y asignarlos a las variables del componente
      this.cadena = params.get('cadena');
      this.titulo = params.get('titulo');
      this.autor = params.get('autor');
      if(this.titulo==null&&this.autor==null){
        this.titulo='true';
      }
      // Aquí puedes realizar cualquier lógica adicional según los nuevos valores de los parámetros
    });

    
  }

  notificacion:Boolean=true;

  titulo!:string | null;
  autor!:string | null;
  cadena!:string | null;
  categoria!:string;

  asignarCategoria(categoria:string){
    console.log(categoria);
  }

  asignarValores(){
    
    this.cadena=this.route.snapshot.paramMap.get('cadena');
    this.titulo=this.route.snapshot.paramMap.get('titulo');
    this.autor=this.route.snapshot.paramMap.get('autor');
    console.log(this.titulo, this.autor, this.cadena, 'navbar');
  }


  clickAutor(){
    this.checkTitulo=false;
    this.checkAutor=true;
    this.autor='true';
    this.titulo='false';
    console.log(this.titulo, this.autor, this.cadena);
  }
  clickTitulo(){
    this.checkTitulo=true;
    this.checkAutor=false;
    this.autor='false';
    this.titulo='true';
    console.log(this.titulo, this.autor, this.cadena);
  }

  checkAutor!: boolean;
  checkTitulo!: boolean;

  

}
