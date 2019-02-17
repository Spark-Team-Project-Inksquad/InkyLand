import { Component, OnInit } from "@angular/core";

//routing
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

// Api lib
import { HttpClient } from "@angular/common/http";
import { ApiInterfaceService } from "../services/api-interface.service";

// Token lib
import { TokenStorageService } from "../services/token-storage.service";

@Component({
  selector: "app-create-printing-offer-page",
  templateUrl: "./create-printing-offer-page.component.html",
  styleUrls: ["./create-printing-offer-page.component.sass"],
  providers: [ApiInterfaceService, HttpClient, TokenStorageService]
})
export class CreatePrintingOfferPageComponent implements OnInit {
  // Example starting format
  /**
  "printerName": "My brother's bro printer",
      "printer": 1,
      "minPrice": "10.00",
      "maxPrice": "1000.00",
      "note": "Aight"
  **/

  private userToken: string = "";
  private profile: any = null;
  public model: object = {
    printerName: "",
    printer: null,
    minPrice: 0.0,
    maxPrice: 0.0,
    note: ""
  };
  public printers: object[] = [];

  //TODO if user is not logged in redirect to the login page
  constructor(
    private api: ApiInterfaceService,
    private tokenStore: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    //get the printer options
    this.getPrinters();

    //retrieve the userToken + profile
    this.retrieveUserTokenAndProfile();
  }

  /**
  creates the printing offer
  **/
  createPrintingOffer() {
    //modify the model so that it has an owner
    this.model["owner"] = this.profile.id;

    // make the api creation request
    this.api.createPrintingOffer(this.userToken, this.model).subscribe(data => {
      console.log(data);
      alert("printing offer successfully created!");
    });
  }

  //retrieves and holds on to user token and profile for creation use
  retrieveUserTokenAndProfile() {
    //retrieve the user token
    this.tokenStore.getToken().subscribe(data => {
      let token: string = data as string;

      if (data !== null) {
        //save user token
        this.userToken = token;

        //retrieve the profile
        this.api.getProfile(this.userToken).subscribe(profile => {
          this.profile = profile;
        });
      }
    });
  }

  /**
  retrieves all the printers and saves it to the
  printers variable for a list of options for the creation/update form
  **/

  getPrinters() {
    this.api.getPrinters().subscribe(data => {
      this.printers = data;
      console.log(this.printers);
    });
  }
}
