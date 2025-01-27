import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl:'./navbar.component.css',
  standalone: true,
  imports: [Menubar, BadgeModule, AvatarModule, InputTextModule, Ripple, CommonModule,MenubarModule],
})
export class NavbarComponent implements OnInit{

  items!:MenuItem[];

  ngOnInit(): void {
    this.items=[
      {
        label: 'Home',
        icon: 'pi pi-home'
      }
    ]
  }

}
