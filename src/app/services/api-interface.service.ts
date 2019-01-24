import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class ApiInterfaceService {

  private endpoint:string = "http://localhost:8000";

  constructor(private http: HttpClient) {}

  // STUB
  // sign In

  public signIn(username: string, password:string) {

    this.http.post(this.endpoint + "/api/rest-auth/login/", {
      username: username,
      password: password
    })
      .subscribe(token => {
        console.log(token);
      })

  }

  // sign Out

  // register

  // STUB accounts
}
