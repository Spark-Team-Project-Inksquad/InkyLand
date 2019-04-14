import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  SimpleChange,
  Input,
  Output,
  EventEmitter
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
  @Input() isFavorited: boolean;
  @Output() favoriteStatusChange = new EventEmitter<boolean>();

  private colorClass: string;

  ngOnInit() {
    this.colorClass = "card-" + this.cardColor;

    if (this.mode == "favorite") {
      this.colorClass = "card-pink";
    }

    console.log(this.vendorInfo);
  }

  retrieveAuthToken() {}

  //favorites or unfavorites vendor
  favoriteOrUnFavoriteVendor() {
    this.favoriteStatusChange.emit(!this.isFavorited);
  }
}
