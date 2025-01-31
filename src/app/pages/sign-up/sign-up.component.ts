import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
    standalone: false
})
export class SignUpComponent implements OnInit {
    
  signUpForm:FormGroup;
  passVisible:string="password";
  showPassImg:boolean=true;
  isLoadding:boolean=false;
  selectGender=[
    {value:'otro', label:'Perfiero no decirlo'},
    {value:'mujer', label:'Mujer'},
    {value:'hombre', label:'Hombre'}
  ]

  constructor(
    private mainService:MainService,
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
    // this.toastService.showMessage(
    //   'info',
    //   'Sign Up',
    //   'El número telefonico no es requerido.'
    // )
  }

  newUser(user:any){
    this.isLoadding=true;
    if(this.signUpForm.valid){
      const formData = this.signUpForm.value;
      this.mainService.postData('auth/signup',formData).subscribe(
        {
          next: (data:any)=>{
            if(data.token!=null){
              // this.toastService.showMessage(
              //   'success',
              //   'Sign Up',
              //   'Persona creada exitosamente.'
              // );
              sessionStorage.setItem('token',data.token);
              this.mainService.setEmailFromToken();
              this.router.navigate(['/'])
            }else{
              // this.toastService.showMessage(
              //   'danger',
              //   'Sign Up',
              //   'No se pudo crear la persona.'
              // );
            }
          },error: (error)=>{
            // this.toastService.showMessage(
            //   'danger',
            //   'Sign Up',
            //   'No se pudo crear la persona.'
            // );
          }
        }

      )
    }else{
      this.signUpForm.markAllAsTouched();
      // this.toastService.showMessage(
      //   'danger',
      //   'Sign Up',
      //   'Formulario invalido.'
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
