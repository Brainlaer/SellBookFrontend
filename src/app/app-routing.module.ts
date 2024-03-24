import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { libroDto } from './models/libro-dto';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  },
  {
    path:'catalogo/:titulo/:autor/:cadena',
    component:CatalogoComponent,
    pathMatch:'full'
  },
  {
    path:'catalogo/:categoria',
    component:CatalogoComponent,
    pathMatch:'full'
  },
  {
    path:'iniciar_session',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'registrarse',
    component:SignUpComponent,
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
