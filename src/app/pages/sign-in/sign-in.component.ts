import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/components/message/service/toast.service';
import { MainService } from 'src/app/services/main.service';
import { handleErrors } from '../helpers/handleerrors';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit{

  signInForm:FormGroup;
  passVisible:string="password";
  showPassImg:boolean=true;
  isLoadding:boolean=false;

  constructor(
    private mainService:MainService,
    private toastService:ToastService,
    private router:Router
  ){
    this.signInForm=new FormGroup({
      mail: new FormControl('',[Validators.required, Validators.email, Validators.maxLength(32)]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)]),
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
              this.toastService.showMessage(
                'success',
                'Sessión iniciada.'
              );
              sessionStorage.setItem('token',data.token);
              this.mainService.setEmailFromToken();
              this.router.navigate(['/'])
            }else{
              this.toastService.showMessage(
                'danger',
                'No se pudo iniciar sessión.'
              );
            }
          },error:(error)=>{
            handleErrors(error,this.toastService);
          }
        }

      )
    }else{
      this.signInForm.markAllAsTouched();
      this.toastService.showMessage(
        'warning',
        'Asegurate de ingresar el correo y la contraseña correctamente.'
      );
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
