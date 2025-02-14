import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';
import { SignInComponent } from './features/auth/sign-in/sign-in.component';
import { SignUpComponent } from './features/auth/sign-up/sign-up.component';
import { SearchResultsComponent } from './features/pages/search-results/search-results.component';
import { ViewBookComponent } from './features/pages/view-book/view-book.component';
import { ProfileComponent } from './features/pages/profile/profile.component';
import { BillingComponent } from './features/pages/billing/billing.component';
 
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
  // {path:'navbar',
  //   component:NavbarComponent,
  //   outlet:'navbar'
  // },
  {
    path:'login',
    component:SignInComponent,
    pathMatch:'full'
  },
  {
    path:'register',
    component:SignUpComponent,
    pathMatch:'full'
  },
  {
    path:'details',
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
