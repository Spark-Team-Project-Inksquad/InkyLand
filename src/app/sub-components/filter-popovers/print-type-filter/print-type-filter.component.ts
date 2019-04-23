import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "print-type-popup-filter",
  templateUrl: "./print-type-filter.component.html",
  styleUrls: ["./print-type-filter.component.scss"]
})
export class PrintTypeFilterComponent implements OnInit {
  //input connector for correct popup connection
  @Input("for") for_id: string;

  constructor() {}

  ngOnInit() {}
}
