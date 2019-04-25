import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "vendor-spec-card",
  templateUrl: "./vendor-spec-card.component.html",
  styleUrls: ["./vendor-spec-card.component.scss"]
})
export class VendorSpecCardComponent implements OnInit {
  //vendor spec data
  @Input() vendor_spec;

  //checks if auth
  @Input() isAuth: boolean;

  //delete event emmiter
  @Output() deleteVendorSpecEmitter: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    //DEBUG
    console.log("VENdor spec");
    console.log(this.vendor_spec);
  }

  //sends message to delete vendor spec
  deleteVendorSpec() {
    console.log("event");
    this.deleteVendorSpecEmitter.emit(null);
  }
}
