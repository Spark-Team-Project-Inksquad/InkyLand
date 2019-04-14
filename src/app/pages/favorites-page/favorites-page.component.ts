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
  selector: "app-favorites-page",
  templateUrl: "./favorites-page.component.html",
  styleUrls: ["./favorites-page.component.scss"],
  providers: [ApiInterfaceService, HttpClient, TokenStorageService]
})
export class FavoritesPageComponent implements OnInit {
  private favoriteVendors: any[] = [];
  private userToken: string = undefined;

  constructor(
    private api: ApiInterfaceService,
    private tokenStore: TokenStorageService
  ) {}

  retrieveAuthToken() {
    let observable = this.tokenStore.getToken().pipe(share());

    observable.subscribe(data => {
      let token = data as string;
      if (data !== null) {
        this.userToken = token;
      }
    });

    return observable;
  }

  //retrieves list of favorite vendors
  retrieveFavoriteVendors() {
    //ask server for user favorite vendors
    this.api.listFavorites(this.userToken).subscribe(vendors => {
      let uniqueVendors = [];

      //load in initial unique vendors without their id
      let uniqueVendorsWithoutId = uniqueVendors.map(v => {
        return v.owner.id.toString() + "_" + v.vendor.id.toString();
      });

      //gets the unique vendors
      vendors.forEach(v => {
        let _v = v.owner.id.toString() + "_" + v.vendor.id.toString();

        if (uniqueVendorsWithoutId.includes(_v)) {
          return;
        } else {
          uniqueVendors.push(v);
          uniqueVendorsWithoutId.push(_v);
        }
      });

      //sets the favorite vendors component variable
      this.favoriteVendors = uniqueVendors.map(v => v.vendor);
    });
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
    let vendors = this.favoriteVendors;

    let rows = Math.ceil(vendors.length / items_per_row);
    let vendor_grid: any = [];
    let vendor_i = 0;
    for (let y = 0; y < rows; y++) {
      let vendor_row: any[] = [];
      for (let x = 0; x < items_per_row; x++) {
        if (vendor_i == vendors.length) {
          break;
        }
        vendor_row.push(vendors[vendor_i]);
        vendor_i++;
      }
      vendor_grid.push(vendor_row);
    }
    return vendor_grid;
  }

  ngOnInit() {
    let authPromise = this.retrieveAuthToken().toPromise();

    authPromise.then(_ => {
      this.retrieveFavoriteVendors();
    });
  }
}
