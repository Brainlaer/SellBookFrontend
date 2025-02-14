import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { MenubarModule } from 'primeng/menubar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { CartComponent } from 'src/app/features/pages/cart/cart.component';
import { Router } from '@angular/router';
import { SpeedDialModule } from 'primeng/speeddial';
import { CartService } from 'src/app/features/pages/cart/service/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true,
  imports: [Menubar, BadgeModule, AvatarModule, InputTextModule, Ripple, CommonModule, MenubarModule, SplitButtonModule, ToggleSwitch, FormsModule, ButtonModule, DrawerModule, CartComponent, SpeedDialModule],
})
export class NavbarComponent implements OnInit {

  isDark: boolean = false;
  items!: MenuItem[];
  itemsProfile!: MenuItem[];
  isVisibleDrawer: boolean = false;
  totalItems$:Observable<number>=this.cartService.countItems();

  constructor(
    private router: Router,
    private cartService:CartService
  ) { }

  ngOnInit(): void {
    this.items = [];
    this.itemsProfile = [
      {
        label: 'Iniciar sesión',
        icon: 'pi pi-sign-in',
        routerLink: 'login'
      }, {
        label: 'Registrar',
        icon: 'pi pi-user-plus',
        routerLink: 'register'
      }
    ]
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    element?.classList.toggle('my-app-dark');
  }

  toggleVisibleDrawer() {
    if (this.isVisibleDrawer) {
      return this.isVisibleDrawer = false;
    } else {
      return this.isVisibleDrawer = true;
    }
  }

  navigateTo(uri: string) {
    this.router.navigateByUrl(`${uri}`)
  }

  goToProfile(){
    if(sessionStorage.getItem('token')){
      this.navigateTo('profile')
    }else{
      this.navigateTo('login')
    }
  }


}
