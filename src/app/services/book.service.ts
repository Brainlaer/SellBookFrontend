import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient:HttpClient) { }

  baseurl='http://localhost:8080/sellbook/book';

  findById(isxn:string){
    return this.httpClient.get(`${environment.url}/book/${isxn}`);
  }

  findLastest(){
    return this.httpClient.get(`${environment.url}/book/recentlyadded`);
  }

  findByAuthorYTitlePreview(stringSearch:String|null){
    return this.httpClient.get(`${environment.url}/book/title&&author/${stringSearch}`);
  }

  findByCategory(categorySearch:number|null){
    return this.httpClient.get(`${environment.url}/book/category/${categorySearch}`);
  }

  findByCategoryAndTitleOrAuthor(categorySearch:number|null, stringSearch:String|null){
    return this.httpClient.get(`${this.baseurl}/search/category/${categorySearch}/string/${stringSearch}`);
  }


}
