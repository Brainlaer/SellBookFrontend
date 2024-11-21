import { Component, OnInit } from '@angular/core';
import { MainService } from './services/main.service';
import { ToastService } from './components/message/service/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'sellbookFrontend';

  constructor(
    private mainService:MainService,
    private toastService:ToastService
  ){}

  ngOnInit(): void {
    this.checkToken();
  }

  checkToken(){
    if(String(sessionStorage.getItem('token'))!=null){
      this.mainService.checkToken().subscribe({
        error:error=>{
          if(error.status==403){
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('username');
            return this.toastService.showMessage(
              'warning',
              'User',
              'La sessión ha expirado'
            )
          }
        }
      })
    }
  }

}
