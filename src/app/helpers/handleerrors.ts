export function handleErrors(error:any, toastService:any, component?:string){
    
    if(error?.error?.response){
        toastService.showMessage(
            'danger',
            component,
            error?.error?.response
          )
    }else{
        toastService.showMessage(
            'danger',
            component,
            'Error en el servidor, vuelva a intentar.'
          )
    }
}