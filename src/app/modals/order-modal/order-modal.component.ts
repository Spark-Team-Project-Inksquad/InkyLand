import { Component, OnInit, Input, Output } from "@angular/core";

declare var $: any;

@Component({
  selector: "order-modal",
  templateUrl: "./order-modal.component.html",
  styleUrls: ["./order-modal.component.scss"]
})
export class OrderModalComponent implements OnInit {
  @Input() vendorInfo: any;

  constructor() {}

  ngOnInit() {}

  placeOrder() {
    var modal: any = $("#placeOrderModal");
    modal.modal();
  }
}
