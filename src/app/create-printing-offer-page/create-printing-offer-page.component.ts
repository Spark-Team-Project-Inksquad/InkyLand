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

  //NOTE need to retrieve printer options
  public model: object = {
    printer: null,
    minPrice: 0.0,
    maxPrice: 0.0,
    note: ""
  };

  constructor() {}

  ngOnInit() {}

  /**
  TODO on form submit
  create the printing offer
  **/
  createPrintingOffer() {}
}
