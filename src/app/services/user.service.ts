import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public httpClient:HttpClient) { }

  baserUrl="http://localhost:8080/auth"

  signUp(user:any){
    return this.httpClient.post(`${this.baserUrl}/signup`,user);
  }
  signIn(user:any){
    return this.httpClient.post(`${this.baserUrl}/signin`,user);
  }
  getDecodedToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Método para obtener el correo electrónico del token
  setEmailFromToken() {
    let token=sessionStorage.getItem('token');
    let decodedToken = this.getDecodedToken(String(token));
    console.log(decodedToken);
    if (decodedToken) {
      let correo=decodedToken.sub;
      sessionStorage.setItem('username',correo);
      console.log(correo);
    }
    return null;
  }

}
