import { Component, OnInit } from "@angular/core";

// Api lib
import { HttpClient } from "@angular/common/http";
import { ApiInterfaceService } from "../services/api-interface.service";

@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.sass"]
})
export class RegisterPageComponent implements OnInit {
  public model: any = {
    username: "",
    password: "",
    confirmpassword: ""
  };

  constructor(private api: ApiInterfaceService) {}

  ngOnInit() {}

  //registers the new user
  //TODO Send out request for registration
  register() {
    //Checks that the password was repeated for validation
    if (this.model.password !== this.model.confirmpassword) {
      console.log("passwords must match!");
      return;
    }

    //send out user registration
    this.api
      .registerUser(
        this.model.username,
        this.model.password,
        this.model.confirmpassword
      )
      .subscribe(token => {
        console.log("Your user token " + token);
      });
  }
}
