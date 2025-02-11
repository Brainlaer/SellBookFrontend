import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private messageService: MessageService
  ) { }

  items: any[] = [];
  costo: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);


  getAll() {
    return this.items;
  }
  
  getTotal() {
    return this.costo.asObservable();
  }

  addOne(itemSelected: any, units: number = 1) {
    const item = {
      id: itemSelected.id,
      image: itemSelected.image,
      title: itemSelected.title,
      author: itemSelected.author,
      cost: itemSelected.cost,
    }
    // Busca una vestimenta existente que coincida con el ID
    let itemSaved = this.items.find((item: any) =>
      itemSelected.id == item.id
    );
    if (itemSaved) {
      // Si ya existe una vestimenta con la misma ID, solo incrementa las unidades
      this.messageService.add({
        severity: 'warn',
        summary: 'Cart',
        detail: `Libro: ${itemSaved.title}, ya existe en al carrito`
      });
    } else {
      // Si no existe, agrega una nueva entrada al carrito
      this.items.push(item);
      this.messageService.add({
        severity: 'info',
        summary: 'Cart',
        detail: `Libro: ${itemSelected.title}, se añadio al carrito.`
      });
      this.totalItems.next(this.items.length);
      this.costo.next(this.costo.value + Number(item.cost));
    }
  }

  removeAll() {
    this.items = [];
    this.costo.next(0);
    this.totalItems.next(this.items.length)
    this.messageService.add({
      severity: 'success',
      summary: 'Cart',
      detail: `El carrito se ha limpiado.`
    });
  }

  removeOne(itemSaved: any) {
    const index = this.items.indexOf(itemSaved);
    if (index > -1) {
      this.items.splice(index, 1);
    }
    this.messageService.add({
      severity: 'success',
      summary: 'Cart',
      detail: `Libro: ${itemSaved.title}, ha sido removido.`
    });
    this.totalItems.next(this.items.length);
    this.costo.next(this.costo.value - Number(itemSaved.cost));
  }

  countItems() {
    return this.totalItems.asObservable();
  }
}
