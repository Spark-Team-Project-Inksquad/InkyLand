import { Component, OnInit } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { ApiInterfaceService } from "../../services/api-interface.service";

// Token lib
import { TokenStorageService } from "../../services/token-storage.service";

// Routing
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

//Jquery lib
declare var $: any;

@Component({
  selector: "login-modal",
  templateUrl: "./login-modal.component.html",
  styleUrls: ["./login-modal.component.scss"],
  providers: [ApiInterfaceService, HttpClient]
})

//NOTE refer to the login regular page
export class LoginModalComponent implements OnInit {
  //login data inputs
  public model: any = {
    username: "",
    password: ""
  };

  constructor(
    private api: ApiInterfaceService,
    private tokenStore: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  //logs the user in
  login() {
    this.api
      .signIn(this.model.username, this.model.password)
      .subscribe(token => {
        console.log("Your user token " + token);
        this.tokenStore.setToken(token).subscribe(token => {
          // close modal
          let theModal = $("#loginModal");
          theModal.modal("hide");
        });
      });
  }
}
