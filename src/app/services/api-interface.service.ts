import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

import { HttpRequest, HttpEventType, HttpResponse } from "@angular/common/http";

// RxJs
import { map, share, catchError } from "rxjs/operators";
import { from } from "rxjs";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiInterfaceService {
  private endpoint: string = "http://localhost:8000";

  constructor(private http: HttpClient) {}

  public getEndpoint(): string {
    return this.endpoint;
  }

  // Util data methods
  public static buildFormData(formData, data, parentKey) {
    if (
      data &&
      typeof data === "object" &&
      !(data instanceof Date) &&
      !(data instanceof File)
    ) {
      Object.keys(data).forEach(key => {
        ApiInterfaceService.buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key
        );
      });
    } else {
      const value = data == null ? "" : data;

      formData.append(parentKey, value);
    }
  }

  public static jsonToFormData(data) {
    const formData = new FormData();

    ApiInterfaceService.buildFormData(formData, data, null);

    return formData;
  }

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

  // signs the user out
  public signOutUser(userToken: string) {
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };

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
    return signOutObservable;
  }

  //Views the user
  public viewUser(userToken: string) {
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };

    let viewUserObservable: Observable<object> = this.http
      .get(this.endpoint + "/api/rest-auth/user", httpOptions)
      .pipe(share());

    viewUserObservable.subscribe({
      next: res => {
        console.log(res);
      },
      error: err => {
        console.log("Error unable to retrieve user info");
      },
      complete: () => {
        console.log("Request complete");
      }
    });

    return viewUserObservable;
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

  //NOTE testme
  //lists vendor profiles
  getVendorProfiles() {
    //Define request path
    let request_path = "/api/profiles/list_vendors/";

    //create observable for api request (GET)
    let getVendorProfilesObservable: Observable<object> = this.http
      .get(this.endpoint + request_path)
      .pipe(share());

    //return observable
    return getVendorProfilesObservable;
  }

  //Retrieves the User Account
  getProfile(userToken: string) {
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };

    let getProfileObservable: Observable<object> = this.http
      .get(this.endpoint + "/api/profiles/logged_in_profile", httpOptions)
      .pipe(share());

    getProfileObservable.subscribe({
      next: profile => {
        console.log("Retrieved Profile");
        console.log(profile);
      },
      error: err => {
        console.error("Unable to retrieve profile");
      },
      complete: () => {
        console.log("retrieval request complete");
      }
    });

    return getProfileObservable;
  }

  //Retrieves the User Account
  updateProfile(userToken: string, newProfile: any) {
    //TODO splitting into 2 sep api requests
    let account_data = Object.assign({}, newProfile);

    account_data["profile_img"] = newProfile["profile_img"];
    account_data["user"] = newProfile["user"]["id"];

    //Convert account data to form data
    let account_form_data = ApiInterfaceService.jsonToFormData(account_data);

    //We can just keep this as JSON
    let user_data = Object.assign({}, newProfile["user"]);

    //DEBUG displaying seperated account and user data
    console.log("Account Data:");
    console.log(account_data);

    console.log("User Data:");
    console.log(user_data);

    //user auth
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };

    //request paths
    let update_account_path = "/api/accounts/" + newProfile["id"] + "/";
    let update_user_path = "/api/users/" + user_data["id"] + "/";

    //update account request
    const updateAccountReq = new HttpRequest(
      "PUT",
      this.endpoint + update_account_path,
      account_form_data,
      httpOptions
    );

    //update the user first and then the account

    let updateUserObservable: Observable<object> = this.http
      .put(this.endpoint + update_user_path, user_data, httpOptions)
      .pipe(share());

    let updateAccountObservable: Observable<object> = this.http
      .request(updateAccountReq)
      .pipe(share());

    let updateProfileObservable = from(
      Promise.all([
        updateUserObservable.toPromise(),
        updateAccountObservable.toPromise()
      ])
    );
    return updateProfileObservable;
  }

  //VendorSpec CRUD

  //Vendor Spec retrieval
  getVendorSpecs() {
    //api request path
    let request_path = "/api/vendorspecs/";

    //create the http observable (GET)
    let getVendorSpecObservable = this.http
      .get(this.endpoint + request_path)
      .pipe(share());

    //return the completed request async
    return getVendorSpecObservable;
  }

  //creates the vendor spec
  createVendorSpec(userToken: string, vendor_spec_payload: any) {
    //auth headers config
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };

    //request path
    let request_path = "/api/vendorspecs/";

    //observable (POST)
    //observable API request (POST)
    let createVendorSpecObservable: Observable<any> = this.http
      .post(this.endpoint + request_path, vendor_spec_payload, httpOptions)
      .pipe(share());

    //return observable for use
    return createVendorSpecObservable;
  }

  //deletes the vendor spec
  deleteVendorSpec(userToken: string, vendor_spec_id: number) {
    //auth headers config
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };

    //request string
    let request_path = "/api/vendorspecs/" + vendor_spec_id + "/";

    // api request observable (DELETE)
    let deleteVendorSpecObservable: Observable<any> = this.http
      .delete(this.endpoint + request_path, httpOptions)
      .pipe(share());

    // return observable
    return deleteVendorSpecObservable;
  }

  //Order CRUD
  placeOrderReq(payload: any) {
    //request path
    let request_path = "/api/orders/";

    //create obseravable (POST)
    let placeOrderObservable: Observable<any> = this.http
      .post(this.endpoint + request_path, payload, {})
      .pipe(share());

    return placeOrderObservable;
  }

  getOrders() {
    //request_path
    let request_path = "/api/orders/";

    let getOrdersObservable: Observable<any> = this.http
      .get(this.endpoint + request_path)
      .pipe(share());

    return getOrdersObservable;
  }

  //Document CRUD

  //returns the document link for a given document
  viewDocumentLink(document: any) {
    let document_link = this.endpoint + document["uploaded_file"];
    return document_link;
  }

  //uploads a new document
  createDocument(userToken: string, order_id: any, payload: any) {
    //form data
    let formData: FormData = new FormData();

    let file: File = payload["uploaded_file"];
    formData.append("uploaded_file", file, file.name);

    //NOTE can potentially optimize
    formData.append("order", order_id);

    //request path
    let request_path: string = "/api/document/";

    // create a http-post request and pass the form
    // tell it to report the upload progress
    const req = new HttpRequest(
      "POST",
      this.endpoint + request_path,
      formData,
      {}
    );

    let createDocumentObservable: Observable<any> = this.http
      .request(req)
      .pipe(share());

    createDocumentObservable.subscribe(event => {
      console.log(event);
    });

    return createDocumentObservable;
  }

  //deletes a document
  //NOTE does not remove from storage
  deleteDocument(userToken: string, document_id: number) {
    //auth headers
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };

    //request path
    let request_path: string = "/api/document/" + document_id + "/";

    //observable (DEL) api request
    let deleteDocumentObservable: Observable<any> = this.http
      .delete(this.endpoint + request_path, httpOptions)
      .pipe(share());

    //return observable
    return deleteDocumentObservable;
  }

  //TODO edits a document
  editDocument() {}
  // TODO Favorite functionality

  //lists user favorites
  listFavorites(userToken: string) {
    //auth headers
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };

    //request path
    let request_path = "/api/favorite-vendors/list_favorites/";

    //observable to retrieve favorites list (GET)
    let listFavoritesObservable: Observable<any> = this.http.get(
      this.endpoint + request_path,
      httpOptions
    );

    // return observable
    return listFavoritesObservable;
  }

  //NOTE testme
  //unfavorites a vendor
  unfavoriteVendor(userToken: string, fav_id: number) {
    //auth headers
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };

    // request path
    let request_path: string =
      "/api/favorite-vendors/" + fav_id + "/unfavorite_vendor/";

    // observable (DELETE) request
    let unfavoriteFavoriteVendorObservable: Observable<any> = this.http
      .delete(this.endpoint + request_path, httpOptions)
      .pipe(share());

    //return observable
    return unfavoriteFavoriteVendorObservable;
  }

  //favorites a vendor
  favoriteVendor(userToken: string, vendor_id: number) {
    console.log("OUGHT TO DO THIS");

    //auth headers
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };

    console.log(userToken);
    //request path
    let request_path: string =
      "/api/profiles/" + vendor_id + "/favorite_vendor/";

    //observable POST
    let favoriteVendorObservable: Observable<object> = this.http
      .post(this.endpoint + request_path, {}, httpOptions)
      .pipe(share());

    //return observable
    return favoriteVendorObservable;
  }
}
