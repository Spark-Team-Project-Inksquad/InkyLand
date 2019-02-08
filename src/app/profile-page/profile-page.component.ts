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

  public tempUserToken:string = "156277228c8b414d858578ee35f247adad9aa28a";

  constructor(private api: ApiInterfaceService, private tokenStore: TokenStorageService) {
    console.log("loaded profile page");
  }

  ngOnInit() {
    //gets the user token
    console.log("TOKEN");
    this.tokenStore.setToken("abcedefd").subscribe((data) => {
      console.log(data);
    })

    //this.getAccount();
  }

  //retrieves the account from the backend server
  getAccount() {
    //this.api.getUserAccount(this.tempUserToken);
  }

}
