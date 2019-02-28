import { Component, OnInit } from "@angular/core";

//routing
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

// Api lib
import { HttpClient } from "@angular/common/http";
import { ApiInterfaceService } from "../services/api-interface.service";

@Component({
  selector: "app-search-offers-page",
  templateUrl: "./search-offers-page.component.html",
  styleUrls: ["./search-offers-page.component.scss"],
  providers: [ApiInterfaceService, HttpClient]
})
export class SearchOffersPageComponent implements OnInit {
  public query: string = "";
  public results: any[] = [];

  constructor(
    private api: ApiInterfaceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  //conducts a search query
  search() {
    // NOTE just grabs all the printing offers
    this.api.getPrintingOffers(true).subscribe(printing_offers => {
      this.results = printing_offers;
      console.log(this.results);
    });
  }
}
