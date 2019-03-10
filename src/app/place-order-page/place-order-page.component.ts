import { Component, OnInit } from "@angular/core";

//routing
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

// Api lib
import { HttpClient } from "@angular/common/http";
import { ApiInterfaceService } from "../services/api-interface.service";

// Token lib
import { TokenStorageService } from "../services/token-storage.service";

@Component({
  selector: "app-place-order-page",
  templateUrl: "./place-order-page.component.html",
  styleUrls: ["./place-order-page.component.scss"]
})
export class PlaceOrderPageComponent implements OnInit {
  //user token for auth
  private userToken: string = null;

  //mode for edit or creation
  private mode: string;

  //list of document options for user to choose from
  public user_documents: any[] = null;

  //main form model for order
  public model: any = {
    printing_offer: null,
    documents: []
  };

  constructor(
    private api: ApiInterfaceService,
    private tokenStore: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // check if mode is create
    this.route.data.subscribe(data => {
      this.mode = data.mode;

      if (this.mode == "edit") {
        // TODO grab order id
      } else {
        // retrieve the printing offer id
        // set printing offer in model
        this.model["printing_offer"] = this.route.snapshot.paramMap.get(
          "offer-id"
        );
      }
    });

    // retrieve user token
    this.tokenStore.getToken().subscribe(data => {
      let token: string = data as string;

      if (data !== null) {
        //save user token
        this.userToken = token;
        this.retrieveUserDocuments();
      }
    });
  }

  //places an order
  placeOrder() {
    this.api.placeOrder(this.userToken, this.model).subscribe(data => {
      alert("order placed!");

      this.router.navigate(["/profile"]);
    });
  }

  // retrieves user documents to choose from for order
  retrieveUserDocuments() {
    this.api.getUserDocuments(this.userToken).subscribe(documents => {
      this.user_documents = documents;
      console.log(this.user_documents);
    });
  }
}