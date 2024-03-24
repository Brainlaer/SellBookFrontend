import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  ngOnInit(): void {
    this.iniciarUsuario();
  } 

  admin:boolean=false;
  usuario:boolean=true;

  

  iniciarUsuario(){
    this.usuario=false;
    this.admin=true;

    
  }
  iniciarAdmin(){
    this.usuario=true;
    this.admin=false;
  }

}
