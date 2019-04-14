import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

import { HttpRequest, HttpEventType, HttpResponse } from "@angular/common/http";

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

  //TODO lists vendor profiles
  getVendorProfiles() {}

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
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };

    let updateProfileObservable: Observable<object> = this.http
      .put(
        this.endpoint + "/api/profiles/" + newProfile.id + "/",
        newProfile,
        httpOptions
      )
      .pipe(share());

    updateProfileObservable.subscribe({
      next: updatedProfile => {
        console.log("Updated Profile");
        console.log(updatedProfile);
      },
      error: err => {
        console.error("Unable to update profile");
      },
      complete: () => {
        console.log("update request complete");
      }
    });

    return updateProfileObservable;
  }

  // Printing Offer CRUD TODO

  //request all the printing offers
  getPrintingOffers(detailed: boolean = false) {
    let request_path: string = "/api/printing-offers/";
    let detailed_request_path: string = "/api/printing-offers/detailed_list/";
    let utilized_request_path: string = request_path;

    //if the user requests for it to be more detailed then yeah we get them the more detailed info
    if (detailed == true) {
      utilized_request_path = detailed_request_path;
    }

    //make the request
    let getPrintingOffers: Observable<object> = this.http
      .get(this.endpoint + utilized_request_path)
      .pipe(share());

    return getPrintingOffers;
  }

  getPrintingOffersForUser(userToken: string, detailed: boolean = false) {
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };

    let request_path: string = "/api/printing-offers/get_auth_printing_offers/";
    let detailed_request_path: string =
      "/api/printing-offers/get_auth_detailed_printing_offers/";
    let utilized_request_path: string = request_path;

    //if the user requests for it to be more detailed then yeah we get them the more detailed info
    if (detailed == true) {
      utilized_request_path = detailed_request_path;
    }

    let getPrintingAuthOffers: Observable<object> = this.http
      .get(this.endpoint + utilized_request_path, httpOptions)
      .pipe(share());

    return getPrintingAuthOffers;
  }

  //request a specific printing offer
  getPrintingOffer(offer_id: number, detailed: boolean = false) {
    //request urls
    let request_path: string = "/api/printing-offers/" + offer_id + "/";
    let detailed_request_path: string =
      "/api/printing-offers/" + offer_id + "/detailed/";
    let utilized_request_path: string = request_path;

    //if the user requests for it to be more detailed then yeah we get them the more detailed info
    if (detailed == true) {
      utilized_request_path = detailed_request_path;
    }

    //make the request
    let getPrintingOffer: Observable<object> = this.http
      .get(this.endpoint + utilized_request_path)
      .pipe(share());

    return getPrintingOffer;
  }

  //deletes a authenticated printing offer
  deletePrintingOffer(userToken: string, printing_offer_id: number) {
    //create the auth headers
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };

    //configure the request path
    let request_path: string =
      "/api/printing-offers/" + printing_offer_id + "/";

    //make the api request observable
    let deletePrintingOfferObservable: Observable<object> = this.http
      .delete(this.endpoint + request_path, httpOptions)
      .pipe(share());

    //return the observable
    return deletePrintingOfferObservable;
  }

  //creates a printing offer
  createPrintingOffer(userToken: string, printing_offer_payload: any) {
    //create http headers for auth
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };

    //configure request path
    let request_path: string = "/api/printing-offers/";

    // make api request method[POST]
    let createPrintingOfferObservable: Observable<any> = this.http
      .post(this.endpoint + request_path, printing_offer_payload, httpOptions)
      .pipe(share());

    //return observable
    return createPrintingOfferObservable;
  }

  //updates a printing offer
  updatePrintingOffer(
    userToken: string,
    printing_offer_id: number,
    printing_offer_payload: any
  ) {
    //create http headers for auth
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };

    // request path config
    let request_path: string =
      "/api/printing-offers/" + printing_offer_id + "/";

    //PUT Request observable
    //update the printing offer
    let updatePrintingOfferObservable: Observable<any> = this.http
      .put(this.endpoint + request_path, printing_offer_payload, httpOptions)
      .pipe(share());

    //return the update observable
    return updatePrintingOfferObservable;
  }

  // Printing Offer Spec CRUD

  //get printing offer spec individual
  getOfferSpec(offer_spec_id: number) {
    //STUB
    //request path
    let request_path: string = "/api/offer-specs/" + offer_spec_id + "/";

    //observable
    let getOfferSpecObservable: Observable<any> = this.http
      .get(this.endpoint + request_path)
      .pipe(share());

    //return observable
    return getOfferSpecObservable;
  }

  //create a specific offer spec
  createOfferSpec(userToken: string, offer_spec_payload: any) {
    // headers for auth
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };

    // request path
    let request_path: string = "/api/offer-specs/";

    //observable (POST request)
    let createOfferSpecObservable: Observable<any> = this.http
      .post(this.endpoint + request_path, offer_spec_payload, httpOptions)
      .pipe(share());

    //return observable
    return createOfferSpecObservable;
  }

  //update a specific offer spec
  updateOfferSpec(
    userToken: string,
    offer_spec_id: number,
    offer_spec_payload: any
  ) {
    //headers for auth
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };

    // request path
    let request_path: string = "/api/offer-specs/" + offer_spec_id + "/";

    // observable request (PUT)
    let updateOfferSpecObservable: Observable<any> = this.http
      .put(this.endpoint + request_path, offer_spec_payload, httpOptions)
      .pipe(share());

    // return observable
    return updateOfferSpecObservable;
  }
  //deletes a specific offer spec
  deleteOfferSpec(userToken: string, offer_spec_id: number) {
    //headers for auth
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };
    //request path
    let request_path: string = "/api/offer-specs/" + offer_spec_id + "/";

    //observable (DELETE request)
    let deleteOfferSpecObservable: Observable<any> = this.http
      .delete(this.endpoint + request_path, httpOptions)
      .pipe(share());

    //return observable
    return deleteOfferSpecObservable;
  }

  //Printers

  //retrieves all printer options
  getPrinters() {
    // request path config
    let request_path: string = "/api/printers/";

    // GET Request observable
    //retrieves list of printers from the server
    let getPrintersObservable: Observable<any> = this.http
      .get(this.endpoint + request_path)
      .pipe(share());

    // return observable
    return getPrintersObservable;
  }

  // Printing Mediums CRUD

  // get printing mediums
  getPrintingMediums() {
    //request path
    let request_path: string = "/api/printing-mediums/";
    //observable (GET Request)
    let getPrintingMediumsObservable: Observable<any> = this.http
      .get(this.endpoint + request_path)
      .pipe(share());
    //return observable
    return getPrintingMediumsObservable;
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

  //retrieves a list of orders that are in progress of being fulfilled for user
  getInProgressOrders(userToken: string) {
    //auth headers config
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };
    //request string
    let request_path = "/api/orders/retrieve_in_progress_orders/";
    //observable API request (GET)
    let getInProgressOrdersObservable: Observable<any> = this.http
      .get(this.endpoint + request_path, httpOptions)
      .pipe(share());

    //return observable
    return getInProgressOrdersObservable;
  }

  //retrieves a list of pending orders that the vendor has yet to fulfill
  getPendingOrders(userToken: string) {
    //auth headers config
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };
    //request string
    let request_path = "/api/orders/retrieve_pending_orders/";

    //observable API request (GET)
    let getPendingOrdersObservable: Observable<any> = this.http
      .get(this.endpoint + request_path, httpOptions)
      .pipe(share());

    //return observable
    return getPendingOrdersObservable;
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

  // retrieves contact info specific to an order
  retrieveOrderContactInfo(userToken: string, order_id: number) {
    //auth headers config
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };

    //request path
    let request_path: string =
      "/api/orders/" + order_id + "/retrieve_contact_info";

    //observable api request (GET)
    let orderContactInfoObservable: Observable<any> = this.http
      .get(this.endpoint + request_path, httpOptions)
      .pipe(share());

    //return observable
    return orderContactInfoObservable;
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

  //gets all the documents of a specific user
  getUserDocuments(userToken: string) {
    //user auth
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: "Token " + userToken })
    };

    //request path
    let request_path: string = "/api/document/view_documents_for_user";

    // Observable (GET) api request
    let getUserDocumentsObservable: Observable<any> = this.http
      .get(this.endpoint + request_path, httpOptions)
      .pipe(share());

    //return Observable
    return getUserDocumentsObservable;
  }

  //TODO retrievs a specific document
  getDocument() {}

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

  //CRUD document Types

  //returns a list of document types
  getDocumentTypes() {
    //request path
    let request_path: string = "/api/document-types/";

    //make the request (GET) observable
    let getDocumentTypesObservable: Observable<any> = this.http
      .get(this.endpoint + request_path)
      .pipe(share());

    //return the observable for data usage
    return getDocumentTypesObservable;
  }

  // TODO Favorite functionality

  //lists user favorites
  listFavorites(authToken: string) {}

  //unfavorites a vendor
  unfavoriteVendor(authToken: string, fav_id: number) {}

  //favorites a vendor
  favoriteVendor(authToken: string, vendor_id: number) {}
}
