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

// Api lib
import { HttpClient } from "@angular/common/http";
import { ApiInterfaceService } from "../../services/api-interface.service";

//jquery
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
  @Input() vendorSpecs: any[];
  @Input() filterCriteria: any;
  @Input() mode: string;
  @Input() isFavorited: boolean;
  @Input() placeOrder: any;
  @Output() favoriteStatusChange = new EventEmitter<boolean>();

  @ViewChild("favoritebutton") favoriteButton;

  private colorClass: string;
  private bestVendorSpec: any;
  private distance: number;

  constructor(private api: ApiInterfaceService) {
    this.randomDistance();
  }

  ngOnInit() {
    this.colorClass = "card-" + this.cardColor;

    if (this.mode == "favorite") {
      this.colorClass = "card-pink";
    }

    //dummy data functions
    this.bestRetVendorSpec();
  }

  ngAfterViewInit() {}

  //favorites or unfavorites vendor
  favoriteOrUnFavoriteVendor() {
    this.favoriteStatusChange.emit(!this.isFavorited);
  }

  //Dummy function just random for now
  bestRetVendorSpec() {
    var best_spec = this.vendorSpecs[
      Math.floor(Math.random() * this.vendorSpecs.length)
    ];
    this.bestVendorSpec = best_spec;
    this.vendorInfo["best_spec"] = this.bestVendorSpec;
  }

  randomDistance() {
    let distance = Math.floor(Math.random() * 10);
    this.distance = 3;
  }
}
