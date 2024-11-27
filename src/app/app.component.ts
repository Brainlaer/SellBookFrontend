import { Component, OnInit } from '@angular/core';
import { MainService } from './services/main.service';
import { ToastService } from './components/message/service/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'sellbookFrontend';

  constructor(
    private mainService:MainService,
    private toastService:ToastService
  ){}



}
