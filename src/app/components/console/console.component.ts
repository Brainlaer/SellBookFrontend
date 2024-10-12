import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ConsoleService } from './service/console.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'br-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent{

  constructor(
    private consoleService:ConsoleService
  ){
    consoleService.consoles.subscribe(
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
