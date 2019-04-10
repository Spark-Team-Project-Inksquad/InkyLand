import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  //NOTE refer to the login regular page

  public model: any = {
    username: "",
    password: ""
  };

  constructor() { }

  ngOnInit() {
  }

  //TODO
  login() {
    console.log(this.model);
  }

}
