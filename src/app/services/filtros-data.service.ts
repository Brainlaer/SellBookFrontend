import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FiltrosDataService {

  constructor(private router:Router, private route:ActivatedRoute) { }

  enviarCadena(titulo:any, autor:any, cadena:any){
    this.router.navigate(['/catalogo', titulo, autor, cadena]);
    console.log('datos cambiados')
  };

  rescatarCambios(titulo:any, autor:any, cadena:any){
    cadena=this.route.snapshot.paramMap.get('cadena');
    titulo=this.route.snapshot.paramMap.get('titulo');
    autor=this.route.snapshot.paramMap.get('autor');
    
  }
}


