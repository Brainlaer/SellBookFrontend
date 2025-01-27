import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { HomeComponent } from './pages/home/home.component';
import { ViewBookComponent } from './pages/view-book/view-book.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BillingComponent } from './pages/billing/billing.component';

@NgModule({ declarations: [
        AppComponent,
        SignInComponent,
        SignUpComponent,
        SearchResultsComponent,
        HomeComponent,
        ViewBookComponent,
        CartComponent,
        ProfileComponent,
        BillingComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
