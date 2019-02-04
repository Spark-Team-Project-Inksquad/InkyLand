import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

// RxJs
import { map, share, catchError } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiInterfaceService {
  private endpoint: string = "http://localhost:8000";

  constructor(private http: HttpClient) {}

  // signs the user in and sends back a auth token
  // expects {key: KEY}
  public signIn(username: string, password: string) {
    let signInObservable: Observable<string> = this.http
      .post(this.endpoint + "/api/rest-auth/login/", {
        username: username,
        password: password
      })
      .pipe(map(tokenJson => tokenJson["key"]))
      .pipe(share());

    signInObservable.subscribe({
      next: token => {
        console.log(token);
        console.log("Login Success");
      },
      error: err => {
        console.error("Unable to log in");
      },
      complete: () => {
        console.log("Request complete!");
      }
    });

    return signInObservable;
  }

  //Views the user
  public viewUser(
    userToken:string
  ) {

      const httpOptions = {
        headers: new HttpHeaders({'Authorization': 'Token ' + userToken})
      }

      let viewUserObservable: Observable<object> = this.http
        .get(this.endpoint + "/api/rest-auth/user",  httpOptions)
        .pipe(share());

      viewUserObservable.subscribe({
        next: (res) => {
          console.log(res);
        },
        error: err => {
          console.log("Error unable to retrieve user info");
        },
        complete: () => {
          console.log("Request complete");
        }
      })

      return viewUserObservable;
  }

  // signs the user out
  // NOTE test this
  public signOutUser(
    authToken:string
  ){
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Token ' + userToken})
    }

    let signOutObservable: Observable<object> = this.http
      .post(this.endpoint + "/api/rest-auth/logout/", {}, httpOptions)
      .pipe(share());


    signOutObservable.subscribe({
      next: res => {
        console.log("Logout Success!");
      },
      error: err => {
        console.error("Unable to log out");
      },
      complete: () => {
        console.log("logout request complete");
      }
    });

    return signInObservable;

  }

  // registers the user
  public registerUser(
    username: string,
    password: string,
    password_confirm: string
  ) {
    let signInObservable: Observable<string> = this.http
      .post(this.endpoint + "/api/rest-auth/registration/", {
        username: username,
        password1: password,
        password2: password_confirm
      })
      .pipe(map(tokenJson => tokenJson["key"]))
      .pipe(share());

    signInObservable.subscribe({
      next: token => {
        console.log("Register Success!:" + token);
      },
      error: err => {
        console.error("Unable to log in");
        console.error("Password may be too simple!");
      },
      complete: () => {
        console.log("registration request complete");
      }
    });

    return signInObservable;
  }

  // STUB accounts

  //Retrieves the User Account
  getUserAccount(userToken:string) {
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Token ' + userToken})
    }

    let getUserAccountObservable:Observable<object> = undefined;

    getUserAccountObservable.subscribe({
      next: account => {
        console.log("Retrieved Account");
        console.log(account)
      },
      error: err => {
        console.error("Unable to retrieve account");
      },
      complete: () => {
        console.log("retrieval request complete");
      }
    });

    return getUserAccountObservable;

  }

}
