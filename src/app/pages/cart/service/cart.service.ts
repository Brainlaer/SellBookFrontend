import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from 'src/app/components/message/service/toast.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private toastService:ToastService
  ) { }


  items: any[] = [];
  costo: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  getAll() {
    return this.items;

  }
  getTotal() {
    return this.costo.asObservable();
  }

  addOne(itemSelected: any, units:number=1) {
    const item={
      id:itemSelected.isxn,
      image:itemSelected.image,
      title:itemSelected.title,
      author:itemSelected.author,
      cost:itemSelected.cost,
      }
    // Busca una vestimenta existente que coincida con el ID
    let itemSaved = this.items.find(data =>
      data.item.id == item.id
    );
    console.log(itemSaved, item)

    if (itemSaved) {
      // Si ya existe una vestimenta con la misma ID, solo incrementa las unidades
      this.toastService.showMessage(
        'warning',
        'Cart',
        `Libro: ${itemSaved.item.title}, ya existe en al carrito.`
      );
    } else {
      // Si no existe, agrega una nueva entrada al carrito
      const itemToSave = {
        id: this.items.length + 1,
        item: { ...item }
      };
      this.items.push(itemToSave);
      this.toastService.showMessage(
        'info',
        'Cart',
        `Libro: ${itemToSave.item.title}, se añadio al carrito.`
      );
      this.costo.next(this.costo.value + Number(item.cost));
    }

  }
  removeAll(){
    this.items=[];
    this.costo.next(0);
    this.toastService.showMessage(
      'success',
      'Cart',
      `El carrito se ha limpiado.`
    );
  }
  removeOne(itemSaved: any) {
    if (itemSaved.item.units > 1) {
      itemSaved.item.units--;
      this.toastService.showMessage(
        'success',
        'Cart',
        `Una unidad del libro: ${itemSaved.item.title}, ha sido removido.`
      );
    } else {
      const index = this.items.indexOf(itemSaved);
      if (index > -1) {
        this.items.splice(index, 1);
      }
      this.toastService.showMessage(
        'success',
        'Cart',
        `Libro: ${itemSaved.item.title}, ha sido removido.`
      );
    }
    this.costo.next(this.costo.value - Number(itemSaved.item.cost));
  }

  countItems(vestimentaList: any): boolean {
    if (vestimentaList.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
