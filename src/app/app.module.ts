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
import { MessageComponent } from './components/message/message.component';
import { DropdownDirective } from './components/dropdown/dropdown.directive';
import { InputDirective } from './components/input/input.directive';
import { InputSearchBarDirective } from './components/search-bar/input-search-bar.directive';
import { ButtonSearchBarDirective } from './components/search-bar/button-search-bar.directive';
import { TableComponent } from './components/table/table.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { MiniThumbnailComponent } from './components/mini-thumbnail/mini-thumbnail.component';
import { SearchBarComponent } from './components/search-bar/search-bar/search-bar.component';
import { DialogDirective } from './components/dialog/dialog.directive';
import { DialogComponent } from './components/dialog/dialog/dialog.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LabelInputComponent } from './components/input/label-input/label-input.component';
import { BillingComponent } from './pages/billing/billing.component';
import { ThumbnailDetailsComponent } from './components/thumbnail-details/thumbnail-details.component';
import { CardComponent } from './components/card/card.component';
import { IconDirective } from './components/icon/icon.directive';
import { SaveInputComponent } from './components/save-input/save-input.component';
import { CheckboxComponent } from './components/form/checkbox/checkbox.component';
import { ButtonComponent } from './components/button/button/button.component';


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
    MessageComponent,
    DropdownDirective,
    InputDirective,
    InputSearchBarDirective,
    ButtonSearchBarDirective,
    TableComponent,
    ThumbnailComponent,
    MiniThumbnailComponent,
    SearchBarComponent,
    DialogDirective,
    DialogComponent,
    SideBarComponent,
    CartComponent,
    ProfileComponent,
    LabelInputComponent,
    BillingComponent,
    ThumbnailDetailsComponent,
    CardComponent,
    IconDirective,
    SaveInputComponent,
    CheckboxComponent,
    ButtonComponent
    
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
