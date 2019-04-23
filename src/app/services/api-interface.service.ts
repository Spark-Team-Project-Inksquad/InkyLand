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


  // Orders CRUD
  getOrder(userToken: string, order_id: number) {
    //auth headers config
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };
    //request string
    let request_path = "/api/orders/" + order_id;

    //observable API request (GET)
    let getOrderObservable: Observable<any> = this.http
      .get(this.endpoint + request_path, httpOptions)
      .pipe(share());

    //return observable
    return getOrderObservable;
  }

  //retrieves a specific order that is related to the user
  getDetailedOrder(userToken: string, order_id: number) {
    //auth headers config
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };
    //request string
    let request_path = "/api/orders/" + order_id + "/detailed_order";

    //observable API request (GET)
    let getDetailedOrderObservable: Observable<any> = this.http
      .get(this.endpoint + request_path, httpOptions)
      .pipe(share());

    //return observable
    return getDetailedOrderObservable;
  }

  // places a new order
  placeOrder(userToken: string, order_payload: any) {
    //auth headers config
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };

    let printing_offer_id = order_payload["printing_offer"];

    //request string
    let request_path =
      "/api/printing-offers/" + printing_offer_id + "/place_order/";

    //observable API request (POST)
    let placeOrderObservable: Observable<any> = this.http
      .post(this.endpoint + request_path, order_payload, httpOptions)
      .pipe(share());

    //return observable
    return placeOrderObservable;
  }

  // places a new order
  updateOrder(userToken: string, order_id: number, order_payload: any) {
    //auth headers config
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };

    //request string
    let request_path = "/api/orders/" + order_id + "/";

    //observable API request (POST)
    let updateOrderObservable: Observable<any> = this.http
      .put(this.endpoint + request_path, order_payload, httpOptions)
      .pipe(share());

    //return observable
    return updateOrderObservable;
  }


  // cancels a order
  cancelOrder(userToken: string, order_id: number) {
    // auth headers
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };

    // request path
    let request_path = "/api/orders/" + order_id + "/cancel_order";

    // api request observable (DELETE)
    let cancelOrderObservable: Observable<any> = this.http
      .delete(this.endpoint + request_path, httpOptions)
      .pipe(share());

    // return observable
    return cancelOrderObservable;
  }

  //Document CRUD

  //retrieves the documents associated with a specific order
  getOrderDocuments(userToken: string, order_id: number) {
    //user auth
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };

    //request path
    let request_path: string = "/api/orders/" + order_id + "/documents/";

    //observable api request (GET)
    let getOrderDocumentsObservable: Observable<any> = this.http
      .get(this.endpoint + request_path, httpOptions)
      .pipe(share());

    //return observable
    return getOrderDocumentsObservable;
  }


  //returns the document link for a given document
  viewDocumentLink(document: any) {
    let document_link = this.endpoint + document["uploaded_file"];
    return document_link;
  }

  //uploads a new document
  createDocument(userToken: string, user_id: any, payload: any) {
    // auth headers
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };

    //form data
    let formData: FormData = new FormData();

    let file: File = payload["uploaded_file"];
    formData.append("uploaded_file", file, file.name);

    //NOTE can potentially optimize
    formData.append("owner", user_id);

    if (payload["document_type"] != null) {
      formData.append("document_type", payload["document_type"]);
    }

    //request path
    let request_path: string = "/api/document/";

    // create a http-post request and pass the form
    // tell it to report the upload progress
    const req = new HttpRequest(
      "POST",
      this.endpoint + request_path,
      formData,
      httpOptions
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
