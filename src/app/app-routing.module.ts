import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomePageComponent } from "./pages/home-page/home-page.component";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";
import { EditProfilePageComponent } from "./pages/edit-profile-page/edit-profile-page.component";
import { OrdersPageComponent } from "./pages/orders-page/orders-page.component";
import { FavoritesPageComponent } from "./pages/favorites-page/favorites-page.component";
import { MessagePageComponent } from "./pages/message-page/message-page.component";

//Vendor Spec
import { VendorSpecViewComponent } from './pages/vendor-spec-view/vendor-spec-view.component';

const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "orders", component: OrdersPageComponent },
  { path: "messages", component: MessagePageComponent },
  { path: "favorites", component: FavoritesPageComponent },
  { path: "profile", component: ProfilePageComponent },
  { path: "edit-profile", component: EditProfilePageComponent },
  {path: "vendor-specs/:id", component: VendorSpecViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
