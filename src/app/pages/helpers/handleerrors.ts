export function handleErrors(error:any, toastService:any){
    
    if(error?.error?.response){
        toastService.showMessage(
            'danger',
            error?.error?.response
          )
    }else if(error?.message){
        toastService.showMessage(
            'danger',
            'Error en el servidor, vuelva a intentar.'
          )
    }else{
        toastService.showMessage(
            'danger',
            'Error de conexión, por favor intente mas tarde.',
            false
          )
    }
}