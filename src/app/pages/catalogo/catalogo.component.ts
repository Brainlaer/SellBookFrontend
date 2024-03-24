import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router, RouterLink } from '@angular/router';
import { catchError, filter } from 'rxjs';
import { libroDto } from 'src/app/models/libro-dto';
import { FiltrosDataService } from 'src/app/services/filtros-data.service';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit{

  constructor(private libroService:LibroService, private route:ActivatedRoute, private router:Router){
    
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      // Obtener los valores de los parámetros de la URL y asignarlos a las variables del componente
      this.cadena = params.get('cadena');
      this.titulo = params.get('titulo');
      this.autor = params.get('autor');
      this.consultar();
      
      // Aquí puedes realizar cualquier lógica adicional según los nuevos valores de los parámetros
      console.log('Parámetros de la URL actualizados:', this.cadena, this.titulo, this.autor);
    });

    
  }






  librosDto:libroDto[]=[];


  cadena!:string | null;
  titulo!:string | null;
  autor!:string | null;
  conLibros=false;

  consultar(){
    
     
      this.listarPorTitulo();
      this.listarPorAutor();
      this.cantidadLibros();
      console.log(this.titulo,this.autor,this.cadena, 'catalogo');
  }

  cantidadLibros(){
    if(this.librosDto==null){
      return this.conLibros=false;
    }
    else{
      return this.conLibros=true;
    }
  }

  listarPorTitulo(){
    if(this.titulo=='true'){
      this.libroService.listarLibrosPorTitulo(this.cadena).subscribe(
        (data:any)=>{
          this.librosDto=data;
          
        }
      );
      return console.log('hecho');
    }else{
      return console.log('no hay filtros');
    }
  }

  listarPorAutor(){
    if(this.autor=='true'){
      this.libroService.listarLibrosPorAutor(this.cadena).subscribe(
        (data:any)=>{
          this.librosDto=data;
        }
      );
      return console.log('hecho');
    }else{
      return console.log('no hay filtros');
    }
  }
}