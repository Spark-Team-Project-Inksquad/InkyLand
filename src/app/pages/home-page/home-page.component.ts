import { Component, OnInit } from "@angular/core";

// Api lib
import { HttpClient } from "@angular/common/http";
import { ApiInterfaceService } from "../../services/api-interface.service";

// Token lib
import { TokenStorageService } from "../../services/token-storage.service";

// Routing
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

//rxjs
import { map, share, catchError } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
  providers: [ApiInterfaceService, HttpClient]
})
export class HomePageComponent implements OnInit {
  private vendors: any[] = [];
  private favorites: any[] = [];

  private userToken: string;

  constructor(
    private api: ApiInterfaceService,
    private tokenStore: TokenStorageService
  ) {}

  retrieveAuthToken() {
    let observable = this.tokenStore
      .getToken()

      .pipe(share());

    observable.subscribe(data => {
      let token = data as string;
      if (data !== null) {
        this.userToken = token;
      }
    });

    return observable;
  }

  //retrieves the list of actual vendors from the server
  retrieveVendors() {
    let observable = this.api.getVendorProfiles();

    observable.subscribe(vendors => {
      this.vendors = this.unfavoriteVendors(vendors);
    });

    return observable;
  }

  //(un)favorites a vendor (visually)
  favoriteVendor(e, vendor_idx) {
    if (e == true) {
      this.vendors[vendor_idx].favorited = true;
    } else if (e == false) {
      this.vendors[vendor_idx].favorited = false;
    }

    if (e == true) {
      //favorite the vendor on the backend
      this.api
        .favoriteVendor(this.userToken, this.vendors[vendor_idx].id)
        .subscribe(res => {
          console.log(res);
        });
    }
  }

  // DEBUG makes each vendor not favorited by default
  unfavoriteVendors(vendors) {
    let new_vendors = [];
    for (let i: number = 0; i < vendors.length; i++) {
      let new_vendor = vendors[i];
      new_vendor.favorited = false;
      new_vendors.push(new_vendor);
    }
    return new_vendors;
  }

  //retrieves the list of vendor favorites
  retrieveFavorites() {
    let observable = this.api
      .listFavorites(this.userToken)

      .pipe(share());

    observable.subscribe(res => {
      console.log("vendor favorites");
      this.favorites = res;
    });

    return observable;
  }

  //Generates a list of dummy vendors
  generateDummyVendors(amount: number) {
    let dummy_vendors: any[] = [];

    let colors = ["pink", "yellow", "blue", "black"];

    let dummyVendor = {
      name: "dummy vendor"
    };

    for (let i = 0; i < amount; i++) {
      let vendor_color = colors[i % colors.length];
      let new_vendor = Object.assign({ color: vendor_color }, dummyVendor);
      dummy_vendors.push(new_vendor);
    }

    return dummy_vendors;
  }

  //generates 2 dimension version of vendors list
  getVendorGrid(items_per_row: number) {
    let rows = Math.ceil(this.vendors.length / items_per_row);
    let vendor_grid: any = [];
    let vendor_i = 0;
    for (let y = 0; y < rows; y++) {
      let vendor_row: any[] = [];
      for (let x = 0; x < items_per_row; x++) {
        if (vendor_i == this.vendors.length) {
          break;
        }
        vendor_row.push(this.vendors[vendor_i]);
        vendor_i++;
      }
      vendor_grid.push(vendor_row);
    }
    return vendor_grid;
  }

  ngOnInit() {
    //this.vendors = this.generateDummyVendors(10);

    this.retrieveAuthToken()
      .toPromise()
      .then(_ => {
        return this.retrieveFavorites().toPromise();
      })
      .then(_ => {
        return this.retrieveVendors().toPromise();
      })
      .then(_ => {
        for (let i = 0; i < this.favorites.length; i++) {
          let favorite_idx = this.favorites[i].vendor.id;

          var favorite_vendor_idx = this.vendors.findIndex(function(vendor) {
            return vendor.id == favorite_idx;
          });

          if (favorite_vendor_idx > -1) {
            this.vendors[favorite_vendor_idx].favorited = true;
          }
        }
      });
  }
}
