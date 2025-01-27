import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { handleErrors } from '../../helpers/handleerrors';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css'],
    standalone: false
})
export class SignInComponent implements OnInit{

  signInForm:FormGroup;
  passVisible:string="password";
  showPassImg:boolean=true;
  isLoadding:boolean=false;
  visibleDialogpassword!:boolean;

  constructor(
    private mainService:MainService,
    private router:Router
  ){
    this.signInForm=new FormGroup({
      mail: new FormControl('',[Validators.required, Validators.email, Validators.maxLength(32)]),
      password: new FormControl('',[Validators.required]),
    })
  }

  ngOnInit(): void {
  } 

  signIn(){
    this.isLoadding=true;
    if(this.signInForm.valid){
      const formData = this.signInForm.value;
      this.mainService.postData('auth/signin',formData).subscribe(
        {
          next: (data:any)=>{
            if(data.token!=null){
              // this.toastService.showMessage(
              //   'success',
              //   'Sign In',
              //   'Sessión iniciada.'
              // );
              sessionStorage.setItem('token',data.token);
              this.mainService.setEmailFromToken();
              window.location.href='/'
            }else{
              // this.toastService.showMessage(
              //   'danger',
              //   'Sign In',
              //   'No se pudo iniciar sessión.'
              // );
            }
          },error:(error)=>{
            // handleErrors(error,this.toastService);
          }
        }

      )
    }else{
      this.signInForm.markAllAsTouched();
      // this.toastService.showMessage(
      //   'warning',
      //   'Sign In',
      //   'Asegurate de ingresar el correo y la contraseña correctamente.'
      // );
    }
    this.isLoadding=false;
  }

  showPass(){
    if(this.passVisible=="password"){
      this.showPassImg=false;
      return this.passVisible="text";
    }else{
      this.showPassImg=true;
      return this.passVisible="password";
    }
  }



}
