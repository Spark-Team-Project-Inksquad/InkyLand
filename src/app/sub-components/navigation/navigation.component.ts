import { Component, OnInit } from "@angular/core";

// Api lib
import { HttpClient } from "@angular/common/http";
import { ApiInterfaceService } from "../../services/api-interface.service";

//element ref
declare var $: any;
import { ElementRef } from "@angular/core";

// Token lib
import { TokenStorageService } from "../../services/token-storage.service";

//Routing
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent implements OnInit {
  public profile: any = null;
  public userToken: string = "";
  public navUrl: string = "";

  constructor(
    private api: ApiInterfaceService,
    private tokenStore: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private elRef: ElementRef
  ) {
    this.router.events.subscribe((event: any) => {
      if (event.constructor.name === "NavigationStart") {
        this.authenticateAndRetrieveProfile();
        this.navUrl = event.url;
        console.log(this.navUrl);
      }
    });
  }

  ngOnInit() {
    this.authenticateAndRetrieveProfile();
  }

  getNav(url: string) {
    let baseClass = "nav-link";
    if (this.navUrl == url) {
      return baseClass + " active";
    } else {
      return baseClass;
    }
  }

  authenticateAndRetrieveProfile() {
    //gets the user token
    console.log("TOKEN");
    this.tokenStore.getToken().subscribe(data => {
      let token = data as string;
      if (data !== null) {
        this.userToken = token;
        this.getProfile();
      }
    });
  }

  //retrieves the account from the backend server
  getProfile() {
    this.api.getProfile(this.userToken).subscribe(profile => {
      this.profile = profile;
    });
  }

  //TODO trigger sign in modal
  signInAction() {
    var modal: any = $("#loginModal");
    modal.modal();

    modal.on("hide.bs.modal", e => {
      this.authenticateAndRetrieveProfile();
    });
  }

  logOutAction() {
    this.api.signOutUser(this.userToken).subscribe(res => {
      this.profile = null;
      this.router.navigate(["/"]);
    });
  }
}
