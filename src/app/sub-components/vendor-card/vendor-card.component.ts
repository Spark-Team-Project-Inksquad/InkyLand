import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  SimpleChange,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from "@angular/core";

declare var $: any;

@Component({
  selector: "vendor-card",
  templateUrl: "./vendor-card.component.html",
  styleUrls: ["./vendor-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendorCardComponent implements OnInit {
  @Input() cardColor: string;
  @Input() vendorInfo: any;
  @Input() mode: string;
  @Input() isFavorited: boolean;
  @Output() favoriteStatusChange = new EventEmitter<boolean>();

  private colorClass: string;

  constructor() {}

  ngOnInit() {
    this.colorClass = "card-" + this.cardColor;

    if (this.mode == "favorite") {
      this.colorClass = "card-pink";
    }
  }

  //favorites or unfavorites vendor
  favoriteOrUnFavoriteVendor() {
    this.favoriteStatusChange.emit(!this.isFavorited);
  }
}
