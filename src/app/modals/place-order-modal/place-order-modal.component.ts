import { Component, OnInit, Input, Output } from "@angular/core";

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
  selector: "place-order-modal",
  templateUrl: "./place-order-modal.component.html",
  styleUrls: ["./place-order-modal.component.scss"]
})
export class PlaceOrderModalComponent implements OnInit {
  @Input() vendor_spec;
  @Input() vendor;
  @Input() customer;

  private order_model = {
    completed: false,
    progression: 1,
    quantity: 1,
    vendor_spec: 0,
    vendor: 1,
    customer: 0
  };

  private order_placed: boolean = false;
  private uploaded_file: any;

  constructor(private api: ApiInterfaceService) {}

  ngOnInit() {
    this.order_model["vendor"] = this.vendor.id;
    this.order_model["customer"] = this.customer.id;
    this.order_model["vendor_spec"] = this.vendor_spec.id;
    console.log(this.order_model);
  }

  //retrieves the image file
  onFileChange(e) {
    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      this.uploaded_file = file;
    }
  }

  //places the order
  placeOrder() {
    this.api.placeOrderReq(this.order_model).subscribe(data => {
      console.log(data);

      if (this.uploaded_file) {
        this.api
          .createDocument("", data.id, {
            uploaded_file: this.uploaded_file
          })
          .subscribe(data => {
            console.log(data);
            this.order_placed = true;
          });
      } else {
        this.order_placed = true;
      }
    });
  }

  //increase + decrease quant
  decreaseQuant() {
    this.order_model.quantity -= 1;
  }

  increaseQuant() {
    this.order_model.quantity += 1;
  }
}
