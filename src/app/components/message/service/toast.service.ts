import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { severity } from '../Model/severity';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  consoles:BehaviorSubject<any[]>=new BehaviorSubject<any[]>([]);



  constructor() { }

  showMessage(severity:severity, message:string, closeable:boolean=true){
    this.consoles.subscribe(
      (consoles:any[])=>{
        consoles.push({id:consoles.length+1,message:{severity,message,hidden:false, closeable}});
      }
    );


  }
}
