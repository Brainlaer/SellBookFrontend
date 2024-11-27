import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { ViewBookComponent } from './pages/view-book/view-book.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BillingComponent } from './pages/billing/billing.component';
 
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
    component:SignInComponent,
    pathMatch:'full'
  },
  {
    path:'registrarse',
    component:SignUpComponent,
    pathMatch:'full'
  },
  {
    path:'view_book',
    component:ViewBookComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'billing',
    component:BillingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
