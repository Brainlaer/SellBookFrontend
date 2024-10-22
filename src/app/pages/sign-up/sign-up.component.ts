import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastMessageService } from 'src/app/components/message/service/toast-message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    
  signUpForm:FormGroup;
  passVisible:string="password";
  showPassImg:boolean=true;
  isLoadding:boolean=false;

  constructor(
    private userService:UserService,
    private toastMessageService:ToastMessageService,
    private router:Router
  ){
    this.signUpForm = new FormGroup({
      id: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(12)]),
      name: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      surname: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      gender: new FormControl('0',[Validators.required]),
      birthdate: new FormControl('',[Validators.required]),
      phone: new FormControl('',[Validators.minLength(10), Validators.maxLength(15)]),
      mail: new FormControl('',[Validators.required, Validators.email, Validators.maxLength(32)]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    })
  }
  
  ngOnInit(): void {
  }

  newUser(user:any){
    this.isLoadding=true;
    if(this.signUpForm.valid){
      const formData = this.signUpForm.value;
      this.userService.signUp(formData).subscribe(
        (data:any)=>{
          if(data.token!=null){
            this.toastMessageService.showMessage(
              'success',
              'Persona creada exitosamente.'
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
      this.signUpForm.markAllAsTouched();
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
