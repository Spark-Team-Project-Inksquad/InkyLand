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

  //Id for the order
  private order_id: number;

  //main form model for order
  public model: any = {
    printing_offer: null,
    documents: [],
    address: null,
    shipping: false,
    pickup: false
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
        // grab order id
        this.order_id = parseInt(this.route.snapshot.paramMap.get("id"));
      } else {
        // retrieve the printing offer id
        // set printing offer in model
        this.model["printing_offer"] = parseInt(
          this.route.snapshot.paramMap.get("offer-id")
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

        if (this.mode == "edit") {
          // retrieve the order
          // and save it to the model
          this.retrieveOrder();
        }
      }
    });
  }

  //places an order
  placeOrder() {
    if (this.mode == "create") {
      this.api.placeOrder(this.userToken, this.model).subscribe(data => {
        alert("order placed!");
        this.router.navigate(["/profile"]);
      });
    } else if (this.mode == "edit") {
      this.api
        .updateOrder(this.userToken, this.order_id, this.model)
        .subscribe(data => {
          alert("order updated!");
          this.router.navigate(["/view-order/" + this.order_id]);
        });
    }
  }

  //retrieve an order and save it to edit form
  retrieveOrder() {
    this.api.getOrder(this.userToken, this.order_id).subscribe(order => {
      console.log("EDIT ORDER");
      this.model = order;
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
