import { Component, OnInit } from "@angular/core";

declare var $: any;

@Component({
  selector: "order-modal",
  templateUrl: "./order-modal.component.html",
  styleUrls: ["./order-modal.component.scss"]
})
export class OrderModalComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  placeOrder() {
    var modal: any = $("#placeOrderModal");
    modal.modal();
  }
}
