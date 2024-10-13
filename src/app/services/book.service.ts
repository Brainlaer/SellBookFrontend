import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient:HttpClient) { }

  baseurl='http://localhost:8080/sellbook/book';

  findByIsxn(isxn:string){
    return this.httpClient.get(`${this.baseurl}/id/${isxn}`);
  }

  findLastest(){
    return this.httpClient.get(`${this.baseurl}/recentlyAdded`);
  }

  findByAuthorYTitlePreview(stringSearch:String|null){
    return this.httpClient.get(`${this.baseurl}/findByTitleAndAuthor/${stringSearch}`);
  }

  findByCategoryId(categorySearch:number|null){
    return this.httpClient.get(`${this.baseurl}/searchCategory/${categorySearch}`);
  }

  findByCategoryAndTitleOrAuthor(categorySearch:number|null, stringSearch:String|null){
    return this.httpClient.get(`${this.baseurl}/search/category/${categorySearch}/string/${stringSearch}`);
  }


}
