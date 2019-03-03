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

  //cancels an order
  cancelOrder() {
    this.api.cancelOrder(this.authToken, this.order_id).subscribe(data => {
      alert("order canceled");
      this.router.navigate(["/profile"]);
    });
  }

  //TODO retrieves the vendor contact info
  getVendorContact() {}

  //TODO retrieves the orderer contact info
  getOrdererContact() {}
}
