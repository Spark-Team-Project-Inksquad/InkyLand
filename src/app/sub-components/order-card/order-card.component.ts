import { Component, OnInit, Input, Output } from "@angular/core";

// Api lib
import { HttpClient } from "@angular/common/http";
import { ApiInterfaceService } from "../../services/api-interface.service";

@Component({
  selector: "order-card",
  templateUrl: "./order-card.component.html",
  styleUrls: ["./order-card.component.scss"]
})
export class OrderCardComponent implements OnInit {
  @Input() order;

  constructor(private api: ApiInterfaceService) {}

  ngOnInit() {}
}
