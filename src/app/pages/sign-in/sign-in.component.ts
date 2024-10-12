import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConsoleService } from 'src/app/components/console/service/console.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit{

  signupForm:FormGroup;
  passVisible:string="password";
  showPassImg:boolean=true;
  isLoadding:boolean=false;

  constructor(
    private userService:UserService,
    private consoleService:ConsoleService
  ){
    this.signupForm=new FormGroup({
      mail: new FormControl('',[Validators.required, Validators.email, Validators.maxLength(32)]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    })
  }

  ngOnInit(): void {
  } 

  signIn(){
    this.isLoadding=true;
    if(this.signupForm.valid){
      const formData = this.signupForm.value;
      this.userService.signIn(formData).subscribe(
        (data:any)=>{
          if(data.token!=null){
            this.consoleService.showMessage(
              'success',
              'Sessión iniciada.'
            );
            sessionStorage.setItem('token',data.token);
            this.userService.setEmailFromToken();
            this.signupForm.reset();
          }else{
            this.consoleService.showMessage(
              'danger',
              'No se pudo crear la persona.'
            );
          }
        },
        (error)=>{
          this.consoleService.showMessage(
            'danger',
            'No se pudo crear la persona.'
          );
        }
      )
    }else{
      this.signupForm.markAllAsTouched();
      this.consoleService.showMessage(
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
