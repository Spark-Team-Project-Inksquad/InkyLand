import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomePageComponent } from "./home-page/home-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { EditProfilePageComponent } from "./edit-profile-page/edit-profile-page.component";
import { OfferPageComponent } from "./offer-page/offer-page.component";
import { CreatePrintingOfferPageComponent } from "./create-printing-offer-page/create-printing-offer-page.component";
import { CreateOfferSpecPageComponent } from "./create-offer-spec-page/create-offer-spec-page.component";
import { SearchOffersPageComponent } from "./search-offers-page/search-offers-page.component";
import { ViewOrderPageComponent } from "./view-order-page/view-order-page.component";
import { NewDocumentPageComponent } from "./new-document-page/new-document-page.component";
import { PlaceOrderPageComponent } from "./place-order-page/place-order-page.component";

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
  { path: "printing-offer/:id", component: OfferPageComponent },
  {
    path: "printing-offer/:id/add-offer-spec",
    component: CreateOfferSpecPageComponent,
    pathMatch: "full",
    data: {
      mode: "create"
    }
  },
  {
    path: "printing-offer/:offer-id/place-order",
    component: PlaceOrderPageComponent,
    pathMatch: "full",
    data: {
      mode: "create"
    }
  },
  {
    path: "edit-order/:id",
    component: PlaceOrderPageComponent,
    pathMatch: "full",
    data: {
      mode: "edit"
    }
  },
  {
    path: "edit-offer-spec/:id",
    component: CreateOfferSpecPageComponent,
    pathMatch: "full",
    data: {
      mode: "edit"
    }
  },
  {
    path: "search-offers",
    component: SearchOffersPageComponent
  },
  {
    path: "view-order/:id",
    component: ViewOrderPageComponent
  },
  {
    path: "new-document",
    component: NewDocumentPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
