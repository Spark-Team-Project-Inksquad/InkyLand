import { Component, OnInit } from "@angular/core";

//routing
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

// api
import { HttpClient } from "@angular/common/http";
import { ApiInterfaceService } from "../services/api-interface.service";

// Token lib
import { TokenStorageService } from "../services/token-storage.service";

@Component({
  selector: "app-view-order-page",
  templateUrl: "./view-order-page.component.html",
  styleUrls: ["./view-order-page.component.scss"],
  providers: [ApiInterfaceService, HttpClient, TokenStorageService]
})
// view order page
export class ViewOrderPageComponent implements OnInit {
  //order object
  public order: any = null;
  public order_contact_info: any = null;
  public order_documents: any[] = [];

  private authToken: string = "";
  private order_id: number = null;

  constructor(
    private api: ApiInterfaceService,
    private tokenStore: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    //retrieve the order id from route
    this.order_id = parseInt(this.route.snapshot.paramMap.get("id"));

    //retrieve auth token
    this.tokenStore.getToken().subscribe(token => {
      this.authToken = <string>token;

      // get the order after getting auth token
      this.getOrder();
      this.getOrderContact();
      this.retrieveOrderDocuments();
    });
  }

  //retrieves  the order
  getOrder() {
    this.api.getDetailedOrder(this.authToken, this.order_id).subscribe(data => {
      console.log("order data");
      console.log(data);
      this.order = data;
    });
  }

  // retrieve documents for the order
  retrieveOrderDocuments() {
    this.api
      .getOrderDocuments(this.authToken, this.order_id)
      .subscribe(order_documents => {
        this.order_documents = order_documents;
        console.log("Order docs");
        console.log(this.order_documents);
      });
  }

  //NOTE hardcoded
  viewFile(document) {
    window.location.href = "http://localhost:8000" + document.uploaded_file.url;
  }

  //cancels an order
  cancelOrder() {
    this.api.cancelOrder(this.authToken, this.order_id).subscribe(data => {
      alert("order canceled");
      this.router.navigate(["/profile"]);
    });
  }

  //edits the order
  editOrder() {
    this.router.navigate(["/edit-order/" + this.order_id]);
  }

  //retrieves the order contact information for the vendor and orderer
  getOrderContact() {
    this.api
      .retrieveOrderContactInfo(this.authToken, this.order_id)
      .subscribe(data => {
        console.log("contact info");
        console.log(data);
        this.order_contact_info = data;
      });
  }
}
