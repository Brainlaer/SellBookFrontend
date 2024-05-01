import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  BaseUrl='http://localhost:8080/categoria';

  constructor(public httpClient:HttpClient) { }

  getAllCategories(){
    return this.httpClient.get(`${this.BaseUrl}/all`);
  }

}
