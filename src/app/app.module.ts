import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { EditProfilePageComponent } from "./edit-profile-page/edit-profile-page.component";
import { OfferPageComponent } from "./offer-page/offer-page.component";
import { CreatePrintingOfferPageComponent } from "./create-printing-offer-page/create-printing-offer-page.component";
import { CreateOfferSpecPageComponent } from "./create-offer-spec-page/create-offer-spec-page.component";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavigationComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ProfilePageComponent,
    EditProfilePageComponent,
    OfferPageComponent,
    CreatePrintingOfferPageComponent,
    CreateOfferSpecPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
