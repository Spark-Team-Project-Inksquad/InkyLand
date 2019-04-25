import { Component, OnInit, Input, Output } from "@angular/core";

//api
import { HttpClient } from "@angular/common/http";
import { ApiInterfaceService } from "../../services/api-interface.service";

//jquery
declare var $: any;

@Component({
  selector: "order-modal",
  templateUrl: "./order-modal.component.html",
  styleUrls: ["./order-modal.component.scss"]
})
export class OrderModalComponent implements OnInit {
  @Input() vendorInfo: any;
  @Input() profile: any;

  constructor(private api: ApiInterfaceService) {}

  ngOnInit() {}

  placeOrder() {
    var modal: any = $("#placeOrderModal");
    modal.modal();
  }
}
