import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { NavigationComponent } from "./sub-components/navigation/navigation.component";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";
import { EditProfilePageComponent } from "./pages/edit-profile-page/edit-profile-page.component";

import { VendorCardComponent } from "./sub-components/vendor-card/vendor-card.component";
import { OrdersPageComponent } from "./pages/orders-page/orders-page.component";
import { OrderCardComponent } from "./sub-components/order-card/order-card.component";
import { FavoritesPageComponent } from "./pages/favorites-page/favorites-page.component";

//Chat
import { MessagePageComponent } from "./pages/message-page/message-page.component";
import { MessageProfileCardComponent } from "./sub-components/message-profile-card/message-profile-card.component";
import { MessageBubbleComponent } from "./sub-components/message-bubble/message-bubble.component";

//Modals
import { LoginModalComponent } from "./modals/login-modal/login-modal.component";
import { OrderModalComponent } from "./modals/order-modal/order-modal.component";
import { PlaceOrderModalComponent } from "./modals/place-order-modal/place-order-modal.component";

//filter component
import { PrintTypeFilterComponent } from "./sub-components/filter-popovers/print-type-filter/print-type-filter.component";
import { DistanceFilterComponent } from "./sub-components/filter-popovers/distance-filter/distance-filter.component";
import { ShippingFilterComponent } from "./sub-components/filter-popovers/shipping-filter/shipping-filter.component";
import { QuantityFilterComponent } from "./sub-components/filter-popovers/quantity-filter/quantity-filter.component";
import { PriceFilterComponent } from "./sub-components/filter-popovers/price-filter/price-filter.component";

//Vendor Spec
import { VendorSpecViewComponent } from './pages/vendor-spec-view/vendor-spec-view.component';
import { VendorSpecCardComponent } from './sub-components/vendor-spec-card/vendor-spec-card.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavigationComponent,
    ProfilePageComponent,
    EditProfilePageComponent,
    VendorCardComponent,
    OrdersPageComponent,
    OrderCardComponent,
    FavoritesPageComponent,
    MessagePageComponent,
    MessageProfileCardComponent,
    MessageBubbleComponent,
    LoginModalComponent,
    OrderModalComponent,
    PrintTypeFilterComponent,
    DistanceFilterComponent,
    ShippingFilterComponent,
    QuantityFilterComponent,
    PriceFilterComponent,
    PlaceOrderModalComponent,
    VendorSpecViewComponent,
    VendorSpecCardComponent
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
