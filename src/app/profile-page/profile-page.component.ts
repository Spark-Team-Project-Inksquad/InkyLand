import { Component, OnInit } from "@angular/core";

// Api lib
import { HttpClient } from "@angular/common/http";
import { ApiInterfaceService } from "../services/api-interface.service";

// Token lib
import { TokenStorageService } from "../services/token-storage.service";

//routing
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrls: ["./profile-page.component.sass"],
  providers: [ApiInterfaceService, HttpClient, TokenStorageService]
})
export class ProfilePageComponent implements OnInit {
  public userToken: string;
  public profile: any = null;
  public offers: any[] = [];

  public pending_orders: any = [];
  public inprogress_orders: any = [];

  // DEBUG dummy order
  /**
  {
        "id": 6,
        "address": "",
        "orderer": 9,
        "documents": [],
        "lat": null,
        "lon": null,
        "pickup": false,
        "shipping": false,
        "printing_offer": {
            "id": 6,
            "owner": 10,
            "printerName": "Test Printer",
            "printer": 1,
            "minPrice": "0.00",
            "maxPrice": "100.00",
            "note": "I don't like little kid drawings to print"
        }
    }
  **/
  // Dummy order for DEBUG
  public dummy_order: any = {
    id: 6,
    address: "",
    orderer: 9,
    documents: [],
    lat: null,
    lon: null,
    pickup: false,
    shipping: false,
    printing_offer: {
      id: 6,
      owner: 10,
      printerName: "Test Printer",
      printer: 1,
      minPrice: "0.00",
      maxPrice: "100.00",
      note: "I don't like little kid drawings to print"
    }
  };

  constructor(
    private api: ApiInterfaceService,
    private tokenStore: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log("loaded profile page");
  }

  ngOnInit() {
    //gets the user token
    console.log("TOKEN");
    this.tokenStore.getToken().subscribe(data => {
      let token = data as string;
      if (data !== null) {
        this.userToken = token;
        this.getProfile();
        this.getAuthOffers();
      }
    });
  }

  //retrieves the account from the backend server
  getProfile() {
    this.api.getProfile(this.userToken).subscribe(profile => {
      this.profile = profile;
    });
  }

  //retrieves all the offers of this specific user
  getAuthOffers() {
    this.api.getPrintingOffersForUser(this.userToken, true).subscribe(data => {
      console.log(data);
      this.offers = <any[]>data;
    });
  }

  //TODO retrieves all the pending orders that the owner has yet to fulfill
  getPendingOrders() {}
  //TODO retrieves all the in progress orders that the owner is waiting on
  getProgressOrders() {}

  //creates a printing offer
  createPrintingOffer() {
    //redirect to the printing offer creation page
    this.router.navigate(["/printing-offer/create"]);
  }
}
