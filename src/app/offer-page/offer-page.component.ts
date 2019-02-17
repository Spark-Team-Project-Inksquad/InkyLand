import { Component, OnInit } from "@angular/core";

//routing
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

// async rxjs
import { switchMap, flatMap } from "rxjs/operators";
import { Observable } from "rxjs";

// Api lib
import { HttpClient } from "@angular/common/http";
import { ApiInterfaceService } from "../services/api-interface.service";

// Token lib
import { TokenStorageService } from "../services/token-storage.service";

@Component({
  selector: "app-offer-page",
  templateUrl: "./offer-page.component.html",
  styleUrls: ["./offer-page.component.sass"],
  providers: [ApiInterfaceService, HttpClient, TokenStorageService]
})
export class OfferPageComponent implements OnInit {
  private offer_id: number;
  private printing_offer: any;
  private userToken: string;
  private profile: any;
  private write_access: boolean = false;

  constructor(
    private api: ApiInterfaceService,
    private tokenStore: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    console.log("Yo!");

    this.offer_id = parseInt(this.route.snapshot.paramMap.get("id"));

    //retrieves the user token if auth
    //NOTE simplify
    this.tokenStore
      .getToken()
      .toPromise()
      //retrieve the user token
      .then(
        function(data) {
          let token: string = data as string;
          if (data !== null) {
            this.userToken = token;
            return this.getProfile();
          } else {
            return new Promise((resolve, reject) => {});
          }
        }.bind(this)
      )
      //retrieve the printing offer
      .then(
        function(data) {
          console.log("retriving printing offer");
          return this.retrievePrintingOffer();
        }.bind(this)
      )
      //check if user has write access to offer
      .then(
        function(res) {
          if (this.profile.id == this.printing_offer.owner) {
            this.write_access = true;
          }
        }.bind(this)
      );
  }

  //retrieves the account from the backend server
  getProfile() {
    let profileObservable = this.api.getProfile(this.userToken);

    return profileObservable.toPromise().then(
      function(profile) {
        this.profile = profile;
      }.bind(this)
    );
  }

  //retrieves the specific printing offer info
  //TODO retrieve and display offer specs as well
  retrievePrintingOffer() {
    let printing_offer_id = this.offer_id;

    return new Promise(
      function(resolve, reject) {
        this.api.getPrintingOffer(printing_offer_id, true).subscribe({
          next: printing_offer => {
            console.log("LOADED IN PRINTING OFFER");
            this.printing_offer = printing_offer;
            console.log(this.printing_offer);
            resolve();
          },
          error: err => {
            console.log("Unable to retrieve offer");
            reject();
          }
        });
      }.bind(this)
    );
  }

  //STUB TODO
  // deletes the selected printing offer
  deletePrintingOffer() {
    //TODO make api request to delete the selected offer
    //TODO redirect back to the profile view
    //TODO display a message of sorts signifying that the profile has been deleted
  }

  //STUB TODO
  // allows one to edit the printing offer
  editPrintingOffer() {
    //TODO redirect to the printing offer creation form.
    //with the creation mode enabled
  }
}
