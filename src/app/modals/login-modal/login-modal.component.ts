import { Component, OnInit, Input } from "@angular/core";

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
  @Input() mode: string;

  //login data inputs
  public login_model: any = {
    username: "",
    password: ""
  };

  //sign up data inputs
  public signup_model: any = {
    username: "",
    password: "",
    confirmpassword: ""
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
      .signIn(this.login_model.username, this.login_model.password)
      .subscribe(token => {
        console.log("Your user token " + token);
        this.tokenStore.setToken(token).subscribe(token => {
          // close modal
          let theModal = $("#loginModal");
          theModal.modal("hide");
        });
      });
  }

  //TODO signs up a user

  register() {
    console.log("REGISTER");
    console.log(this.signup_model);
  }

  /**
  register() {
    //Checks that the password was repeated for validation
    if (this.signup_model.password !== this.signup_model.confirmpassword) {
      console.log("passwords must match!");
      return;
    }

    //send out user registration
    this.api
      .registerUser(
        this.signup_model.username,
        this.signup_model.password,
        this.signup_model.confirmpassword
      )
      .subscribe(token => {
        console.log("Your user token " + token);
      });
  }
  **/
}
