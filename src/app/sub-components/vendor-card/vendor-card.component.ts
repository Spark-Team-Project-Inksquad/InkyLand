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
  ChangeDetectionStrategy,
  ViewChild
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
  @Input() placeOrder: any;
  @Output() favoriteStatusChange = new EventEmitter<boolean>();

  @ViewChild("favoritebutton") favoriteButton;

  private colorClass: string;

  constructor() {}

  ngOnInit() {
    this.colorClass = "card-" + this.cardColor;

    if (this.mode == "favorite") {
      this.colorClass = "card-pink";
    }
  }
  ngAfterViewInit() {}

  //favorites or unfavorites vendor
  favoriteOrUnFavoriteVendor() {
    this.favoriteStatusChange.emit(!this.isFavorited);
  }
}
