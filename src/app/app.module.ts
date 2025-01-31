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
import { NavbarComponent } from './components/navbar/navbar.component';
import { ButtonModule } from 'primeng/button';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { MyPreset } from 'src/assets/my-preset';
import { DataViewModule } from 'primeng/dataview';

import { DataView } from 'primeng/dataview';
import { Tag } from 'primeng/tag';
import { Rating } from 'primeng/rating';
import { SelectButton } from 'primeng/selectbutton';
import { Card } from 'primeng/card';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButton } from 'primeng/radiobutton';
import { Fluid } from 'primeng/fluid';
import { InputNumber } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FloatLabel } from 'primeng/floatlabel';
import { DrawerModule } from 'primeng/drawer';
import { DataViewComponent } from './components/data-view/data-view.component';
import { DataViewScrollableComponent } from './components/data-view-scrollable/data-view-scrollable.component';
import { FiltersComponent } from './components/filters/filters.component';
import { Menubar } from 'primeng/menubar';
import { FloatLabelModule } from "primeng/floatlabel"
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({ declarations: [
        AppComponent,
        SignInComponent,
        SignUpComponent,
        SearchResultsComponent,
        ViewBookComponent,
        ProfileComponent,
        BillingComponent,
        HomeComponent
    ],
    bootstrap: [AppComponent], 
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NavbarComponent,
        ButtonModule,
        DataViewModule,
        DataView,
        Tag,
        Rating,
        SelectButton,
        Card,
        ToggleSwitchModule,
        ToggleSwitch,
        CartComponent,
        AccordionModule,
        CheckboxModule,
        RadioButton,
        Fluid,
        InputNumber,
        InputGroupModule,
        InputGroupAddonModule,
        InputTextModule,
        SelectModule,
        FloatLabel,
        DrawerModule,
        DataViewComponent,
        DataViewScrollableComponent,
        FiltersComponent,
        Menubar,
        FloatLabelModule,
        DatePickerModule,
        FluidModule,
        InputNumberModule
    ], 
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
            provideAnimationsAsync(),
            providePrimeNG({
                theme: {
                    preset: MyPreset,
                    options:{
                        darkModeSelector: '.my-app-dark'
                    }
                }
            })
    ]
 })
export class AppModule { }
