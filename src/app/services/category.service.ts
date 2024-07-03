import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  BaseUrl='http://localhost:8080/sellbook/category';

  constructor(public httpClient:HttpClient) { }

  findAll(){
    return this.httpClient.get(`${this.BaseUrl}/findAll`);
  }

  findById(id:number|null){
    return this.httpClient.get(`${this.BaseUrl}/${id}`)
  }

}
