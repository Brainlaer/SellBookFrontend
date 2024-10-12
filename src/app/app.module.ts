import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { ViewBookComponent } from './pages/view-book/view-book.component';
import { ButtonDirective } from './components/button/button.directive';
import { ConsoleComponent } from './components/console/console.component';
import { DropdownDirective } from './components/dropdown/dropdown.directive';
import { InputDirective } from './components/input/input.directive';
import { InputSearchBarDirective } from './components/search-bar/input-search-bar.directive';
import { ButtonSearchBarDirective } from './components/search-bar/button-search-bar.directive';
import { TableComponent } from './components/table/table.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    NavbarComponent,
    SearchResultsComponent,
    HomeComponent,
    FooterComponent,
    ViewBookComponent,
    ButtonDirective,
    ConsoleComponent,
    DropdownDirective,
    InputDirective,
    InputSearchBarDirective,
    ButtonSearchBarDirective,
    TableComponent,
    ThumbnailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
