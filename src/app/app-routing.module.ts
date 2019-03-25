import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";
import { EditProfilePageComponent } from "./pages/edit-profile-page/edit-profile-page.component";
import { OfferPageComponent } from "./pages/offer-page/offer-page.component";
import { CreatePrintingOfferPageComponent } from "./pages/create-printing-offer-page/create-printing-offer-page.component";
import { CreateOfferSpecPageComponent } from "./pages/create-offer-spec-page/create-offer-spec-page.component";
import { SearchOffersPageComponent } from "./pages/search-offers-page/search-offers-page.component";
import { ViewOrderPageComponent } from "./pages/view-order-page/view-order-page.component";
import { NewDocumentPageComponent } from "./pages/new-document-page/new-document-page.component";
import { PlaceOrderPageComponent } from "./pages/place-order-page/place-order-page.component";
import { OrdersPageComponent } from "./pages/orders-page/orders-page.component";
import { FavoritesPageComponent } from "./pages/favorites-page/favorites-page.component";

const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "orders", component: OrdersPageComponent },
  { path: "favorites", component: FavoritesPageComponent },
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
