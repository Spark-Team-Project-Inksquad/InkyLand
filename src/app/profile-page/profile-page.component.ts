import { Component, OnInit } from '@angular/core';

// Api lib
import { HttpClient } from "@angular/common/http";
import { ApiInterfaceService } from "../services/api-interface.service";


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.sass'],
  providers: [ApiInterfaceService, HttpClient]
})
export class ProfilePageComponent implements OnInit {

  public tempUserToken:string = "156277228c8b414d858578ee35f247adad9aa28a";

  constructor(private api: ApiInterfaceService) {
    console.log("loaded profile page");
  }

  ngOnInit() {
    this.getAccount();
  }

  //retrieves the account from the backend server
  getAccount() {
    this.api.getUserAccount(this.tempUserToken);
  }

}
