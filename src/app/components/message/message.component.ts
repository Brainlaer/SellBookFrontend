import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { toastMessageServiceService } from './service/toast-message.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'br-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent{

  constructor(
    private toastMessageService:toastMessageServiceService
  ){
    toastMessageService.consoles.subscribe(
      (consoles:any[])=>{
        this.consoles=consoles;
      }
    );

  }

  consoles:any[]=[]

  hideConsole(console:any){
    this.consoles.forEach((consol)=>consol==console,this.consoles.pop());
    
  }
}
