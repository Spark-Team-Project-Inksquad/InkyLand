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
  }

  click() {
    alert("click");
  }

  //TODO favorites the vendor
  favoriteVendor() {
    //TODO favorite the vendor visually
    console.log("HIT");
    this.favoriteStatusChange.emit(true);

    //TODO favorite the vendor on the backend
  }

  //TODO unfavorites the vendor
  unfavoriteVendor() {
    console.log("UNHIT");
    //TODO unfavorite the vendor visually
    this.favoriteStatusChange.emit(false);
  }
}
