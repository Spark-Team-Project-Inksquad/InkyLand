import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  SimpleChange,
  Input
} from "@angular/core";

@Component({
  selector: "vendor-card",
  templateUrl: "./vendor-card.component.html",
  styleUrls: ["./vendor-card.component.scss"]
})
export class VendorCardComponent implements OnInit {
  @Input() cardColor: string;
  @Input() vendorInfo: any;
  @Input() mode: string;

  private colorClass: string;

  constructor() {}

  ngOnInit() {
    this.colorClass = "card-" + this.cardColor;

    if (this.mode == "favorite") {
      this.colorClass = "card-pink";
    }
  }
}
