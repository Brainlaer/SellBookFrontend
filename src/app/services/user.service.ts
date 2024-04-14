import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public httpClient:HttpClient) { }

  baserUrl="http://localhost:8080/sellbook/usuario"

  signUp(user:any){
    return this.httpClient.post(`${this.baserUrl}/insertar`,user);
  }

}
