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
  passVisible:string="password";

  showPassImg:boolean=true;
  hidePassImg:boolean=false;
  showPass(){
    if(this.passVisible=="password"){
      this.showPassImg=false;
      this.hidePassImg=true;
      return this.passVisible="text";
    }else{
      this.hidePassImg=false;
      this.showPassImg=true;
      return this.passVisible="password";
    }
  }

  iniciarUsuario(){
    this.usuario=false;
    this.admin=true;

    
  }
  iniciarAdmin(){
    this.usuario=true;
    this.admin=false;
  }

}
