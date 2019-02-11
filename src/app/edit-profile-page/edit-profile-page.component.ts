import { Component, OnInit } from '@angular/core';

// Api lib
import { HttpClient } from "@angular/common/http";
import { ApiInterfaceService } from "../services/api-interface.service";

// Token lib
import { TokenStorageService } from "../services/token-storage.service";


@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.sass']
})
export class EditProfilePageComponent implements OnInit {

  public profile: any = null;
  public userToken: string;

  constructor(private api: ApiInterfaceService, private tokenStore: TokenStorageService) {

  }

  ngOnInit() {
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

  getProfile() {
    this.api.getProfile(this.userToken).subscribe(profile => {
      this.profile = profile;
      console.log(this.profile);
    })
  }

}
