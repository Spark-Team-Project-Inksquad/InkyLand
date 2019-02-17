import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomePageComponent } from "./home-page/home-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { EditProfilePageComponent } from "./edit-profile-page/edit-profile-page.component";
import { OfferPageComponent } from "./offer-page/offer-page.component";
import { CreatePrintingOfferPageComponent } from "./create-printing-offer-page/create-printing-offer-page.component";

const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "login", component: LoginPageComponent },
  { path: "register", component: RegisterPageComponent },
  { path: "profile", component: ProfilePageComponent },
  { path: "edit-profile", component: EditProfilePageComponent },
  {
    path: "printing-offer/create",
    component: CreatePrintingOfferPageComponent,
    data: {
      mode: "create"
    },
    pathMatch: "full"
  },
  {
    path: "printing-offer/edit/:id",
    component: CreatePrintingOfferPageComponent,
    data: {
      mode: "edit"
    }
  },
  { path: "printing-offer/:id", component: OfferPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
