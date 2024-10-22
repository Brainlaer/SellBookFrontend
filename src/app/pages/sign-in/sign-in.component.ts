import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastMessageService } from 'src/app/components/message/service/toast-message.service';
import { UserService } from 'src/app/services/user.service';

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
    private userService:UserService,
    private toastMessageService:ToastMessageService,
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
      this.userService.signIn(formData).subscribe(
        (data:any)=>{
          if(data.token!=null){
            this.toastMessageService.showMessage(
              'success',
              'Sessión iniciada.'
            );
            sessionStorage.setItem('token',data.token);
            this.userService.setEmailFromToken();
            this.router.navigate(['/'])
          }else{
            this.toastMessageService.showMessage(
              'danger',
              'No se pudo crear la persona.'
            );
          }
        },
        (error)=>{
          this.toastMessageService.showMessage(
            'danger',
            'No se pudo crear la persona.'
          );
        }
      )
    }else{
      this.signInForm.markAllAsTouched();
      this.toastMessageService.showMessage(
        'danger',
        'Formulario invalido.'
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
