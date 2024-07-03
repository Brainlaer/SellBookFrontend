import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { ViewBookComponent } from './pages/view-book/view-book.component';
import { NavbarComponent } from './components/navbar/navbar.component';
 
const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  },
  {
    path:'search_results',
    component:SearchResultsComponent,
    pathMatch:'full'
  },
  {path:'navbar',
    component:NavbarComponent,
    outlet:'navbar'
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
  },
  {
    path:'view_book/:isxn',
    component:ViewBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
