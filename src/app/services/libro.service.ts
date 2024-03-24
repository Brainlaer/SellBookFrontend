import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  constructor(private httpClient:HttpClient) { }

  baseurl='http://localhost:8080/sellbook/libro';


  librosRecientes(){
    return this.httpClient.get(`${this.baseurl}/librosRecientes`);
  }

  listarLibrosPorTitulo(cadena:string|null){
    return this.httpClient.get(`${this.baseurl}/buscar/titulo/${cadena}`);
  }

  listarLibrosPorAutor(cadena:string|null){
    return this.httpClient.get(`${this.baseurl}/buscar/autor/${cadena}`);
  }

  listarLibrosPorCategorias(cadena:string|null){
    return this.httpClient.get(`${this.baseurl}/buscar/autor/${cadena}`);
  }

}
