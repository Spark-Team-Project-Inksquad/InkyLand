import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-search-offers-page",
  templateUrl: "./search-offers-page.component.html",
  styleUrls: ["./search-offers-page.component.scss"]
})
export class SearchOffersPageComponent implements OnInit {
  public query: string = "";
  public results: any[] = [];

  constructor() {}

  ngOnInit() {}

  //conducts a search query
  search() {
    alert("search query: " + this.query);

    // NOTE just grabs all the printing offers
  }
}
