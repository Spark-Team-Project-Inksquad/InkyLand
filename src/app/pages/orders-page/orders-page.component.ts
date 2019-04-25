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

//element ref + jQuery
declare var $: any;

@Component({
  selector: "app-orders-page",
  templateUrl: "./orders-page.component.html",
  styleUrls: ["./orders-page.component.scss"]
})
export class OrdersPageComponent implements OnInit {
  private orders: any;
  private vendors: any;
  private vendorSpecs: any;
  private profile: any;
  private userToken: any;


  constructor(private api: ApiInterfaceService, private tokenStore: TokenStorageService) {}


  authenticateAndRetrieveProfile() {
      //gets the user token
      console.log("TOKEN");

      let promise = new Promise((resolve, reject) => {

        this.tokenStore.getToken().subscribe(data => {
          let token = data as string;
          if (data !== null) {
            this.userToken = token;
            let nex = this.getProfile();
            nex.toPromise().then (()=> {
              resolve(true);
            })
          }
        });
      })

      return promise;

  }

  //retrieves the account from the backend server
  getProfile() {
    let observable = this.api.getProfile(this.userToken).pipe(share());
    observable.subscribe(profile => {
      this.profile = profile;
    });
    return observable;
  }


  getOrders() {
    let observable = this.api.getOrders().pipe(share());

    observable.subscribe(data => {
      this.orders = data;
    });

    return observable;
  }

  getVendors() {
    let observable = this.api.getVendorProfiles().pipe(share());

    observable.subscribe(data => {
      this.vendors = data;
    });

    return observable;
  }

  getVendorSpecs() {
    let observable = this.api.getVendorSpecs().pipe(share());

    observable.subscribe(data => {
      this.vendorSpecs = data;
      console.log(this.vendorSpecs);
    });

    return observable;
  }

  ngOnInit() {
    var allOfThem = [
      this.getOrders().toPromise(),
      this.getVendors().toPromise(),
      this.getVendorSpecs().toPromise(),
      this.authenticateAndRetrieveProfile()
    ];

    //adding additional info
    Promise.all(allOfThem).then(() => {
      this.orders.forEach(order => {
        this.vendors.forEach(vendor => {
          if (order.vendor == vendor.id) {
            order.vendorInfo = vendor;
          }
        });

        this.vendorSpecs.forEach(vendor_spec => {
          if (order.vendor_spec == vendor_spec.id) {
            order.specInfo = vendor_spec;
          }
        });
      });

      this.orders = this.orders.filter((order) => {
        let orderValid = false;

        if (order.customer == this.profile.id) {
          orderValid = true;
        }

        return orderValid;
      })

    });
  }
}
