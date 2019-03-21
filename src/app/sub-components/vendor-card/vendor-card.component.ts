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

  private colorClass: string;

  constructor() {}

  ngOnInit() {
    this.colorClass = "card-" + this.cardColor;
  }
}
