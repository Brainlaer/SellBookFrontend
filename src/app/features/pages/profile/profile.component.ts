import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { MainService } from 'src/app/core/services/main.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    standalone: false
})
export class ProfileComponent implements OnInit {

  mail:string=String(sessionStorage.getItem('username'));
  user!:FormGroup;

  constructor(
    private mainService:MainService,
    private fb:FormBuilder
  ){
    this.user=this.fb.group({
      id:[''],
      name:[''],
      surname:[''],
      phone:[''],
      mail:[''],
      password:[''],
      homeAddress:['']
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  logout(){
    sessionStorage.clear();
    window.location.href='/'
  }

  getUser(){
    this.mainService.getDataAuth('user/'+this.mail).subscribe({
      next:(response:User)=>{
        this.user.patchValue(response);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

}
