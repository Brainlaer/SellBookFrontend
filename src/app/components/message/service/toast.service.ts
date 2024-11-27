import { Injectable } from '@angular/core';
import { BehaviorSubject, delay } from 'rxjs';
import { severity } from '../Model/severity';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  consoles:BehaviorSubject<any[]>=new BehaviorSubject<any[]>([]);



  constructor() { }

  showMessage(severity:severity, component:string, message:string, closeable:boolean=true){
    this.consoles.subscribe(
      async (consoles:any[])=>{
        const newMessage={id:consoles.length+1,message:{severity,component,message,hidden:false, closeable}}
        consoles.push(newMessage);
      }
    );
  }
}
