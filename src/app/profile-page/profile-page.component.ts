import { Component, OnInit } from "@angular/core";

// Api lib
import { HttpClient } from "@angular/common/http";
import { ApiInterfaceService } from "../services/api-interface.service";

// Token lib
import { TokenStorageService } from "../services/token-storage.service";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrls: ["./profile-page.component.sass"],
  providers: [ApiInterfaceService, HttpClient, TokenStorageService]
})
export class ProfilePageComponent implements OnInit {
  public userToken: string;
  public profile: any = null;
  public offers: any[] = [];

  constructor(
    private api: ApiInterfaceService,
    private tokenStore: TokenStorageService
  ) {
    console.log("loaded profile page");
  }

  ngOnInit() {
    //gets the user token
    console.log("TOKEN");
    this.tokenStore.getToken().subscribe(data => {
      let token = data as string;
      if (data !== null) {
        this.userToken = token;
        this.getProfile();
        this.getAuthOffers();
      }
    });
  }

  //retrieves the account from the backend server
  getProfile() {
    this.api.getProfile(this.userToken).subscribe(profile => {
      this.profile = profile;
    });
  }

  //retrieves all the offers of this specific user
  getAuthOffers() {
    this.api.getPrintingOffersForUser(this.userToken, true).subscribe(data => {
      console.log(data);
      this.offers = <any[]>data;
    });
  }
}
