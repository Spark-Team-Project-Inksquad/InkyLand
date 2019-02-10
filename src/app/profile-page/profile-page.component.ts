import { Component, OnInit } from '@angular/core';

// Api lib
import { HttpClient } from "@angular/common/http";
import { ApiInterfaceService } from "../services/api-interface.service";

// Token lib
import {TokenStorageService} from "../services/token-storage.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.sass'],
  providers: [ApiInterfaceService, HttpClient, TokenStorageService]
})
export class ProfilePageComponent implements OnInit {

  public userToken:string = "156277228c8b414d858578ee35f247adad9aa28a";
  public profile:any = null;


  constructor(private api: ApiInterfaceService, private tokenStore: TokenStorageService) {
    console.log("loaded profile page");
  }

  ngOnInit() {
    //gets the user token
    console.log("TOKEN");
    this.tokenStore.getToken().subscribe((data) => {
      this.userToken = data;
      this.getAccount();
    });

  }

  //retrieves the account from the backend server
  getAccount() {
    this.api.getUserAccount(this.userToken).subscribe((profile) => {
      this.profile = profile;
    })
  }

}
