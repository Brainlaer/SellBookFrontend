import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    
  formNewUser:FormGroup;


  constructor(public userService:UserService){
    this.formNewUser = new FormGroup({
      id: new FormControl('',[Validators.required]),
      nombre: new FormControl('',[Validators.required]),
      apellido: new FormControl('',[Validators.required]),
      genero: new FormControl('',[Validators.required]),
      nacimiento: new FormControl('',[Validators.required]),
      telefono: new FormControl('',[]),
      email: new FormControl('',[Validators.required, Validators.email]),
      contraseña: new FormControl('',[Validators.required, Validators.min(8)]),
    })
  }

  
  ngOnInit(): void {
  }

  hiddenAlerta:boolean=true;
  hiddenLoad:boolean=true;
  disabled:boolean=false;
  error!:any;
  data!:any;
  
  mostrarLoad(){
    this.hiddenLoad=false;
    this.disabled=true;
  }
  cerrarLoad(){
    this.hiddenLoad=true;
    this.disabled=false;
  }

  mostrarAlerta(){
    this.hiddenAlerta=false;
  }
  cerrarAlerta(){
    this.hiddenAlerta=true;
  }


  newUser(user:any){
    this.mostrarLoad();
    if(this.formNewUser.valid){
      const formData = this.formNewUser.value;
      this.userService.signUp(formData).subscribe(
        (data:any)=>{
          console.log(data)
          
        },
        (error)=>{
          console.log(error)
        }
      )
      this.formNewUser.reset();
    }else{
      this.mostrarAlerta();
    }
    
    this.cerrarLoad();
  }
  

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

}
