import { Component, OnInit } from "@angular/core";

// Api lib
import { HttpClient } from "@angular/common/http";
import { ApiInterfaceService } from "../services/api-interface.service";

// Token lib
import {TokenStorageService} from "../services/token-storage.service";


@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.sass"],
  providers: [ApiInterfaceService, HttpClient]
})
export class LoginPageComponent implements OnInit {
  public model: any = {
    username: "",
    password: ""
  };

  constructor(private api: ApiInterfaceService, private tokenStore: TokenStorageService) {}

  ngOnInit() {}

  login() {
    this.api
      .signIn(this.model.username, this.model.password)
      .subscribe(token => {
        console.log("Your user token " + token);
        this.tokenStore.setToken(token).subscribe((token) => {
          //REDIRECT to profile
          
        })
      });
  }


}
