import { Injectable } from "@angular/core"
import { MessageService } from "primeng/api"

@Injectable({
    providedIn: 'root',
  })
export class HandleErrors{

    constructor(
        private messageService:MessageService
    ){}
    handleErrors(error?:any, component?:string){
    
        if(error?.error?.response){
            this.messageService.add({
                severity:'danger',
                detail:component,
                summary:error?.error?.response
            }
              )
        }else{
            this.messageService.add({
                severity:'danger',
                detail:component,
                summary:'Error en el servidor, vuelva a intentar.'
            
            })
        }
    }
    
    handleImageError(){
        return '/assets/noimage.png'
    }
}