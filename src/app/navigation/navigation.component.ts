import { Component, OnInit } from '@angular/core';

// Api lib
import { HttpClient } from "@angular/common/http";
import { ApiInterfaceService } from "../services/api-interface.service";

// Token lib
import { TokenStorageService } from "../services/token-storage.service";

//Routing
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

  public profile:any = null;
  public userToken:string = "";

  constructor(
    private api: ApiInterfaceService,
    private tokenStore: TokenStorageService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event.constructor.name === "NavigationStart"){
        this.authenticateAndRetrieveProfile();
      }
    })
  }

  ngOnInit() {
    this.authenticateAndRetrieveProfile()
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

  logOutAction() {
    this.api.signOutUser(this.userToken).subscribe(res => {
      this.profile = null;
      this.router.navigate(['/']);
    })
  }


}
