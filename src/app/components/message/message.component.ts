import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ToastService } from './service/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'br-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent{

  constructor(
    private toastService:ToastService
  ){
    toastService.consoles.subscribe(
      (consoles:any[])=>{
        this.consoles=consoles;
      }
    );

  }

  consoles:any[]=[]
  

  hideConsole(console:any){
    const index = this.consoles.indexOf(console);
    if (index > -1) {
      this.consoles.splice(index, 1);
    }    
  }
}
