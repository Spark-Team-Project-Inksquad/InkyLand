import { Component, OnInit } from "@angular/core";

// Api lib
import { HttpClient } from "@angular/common/http";
import { ApiInterfaceService } from "../../services/api-interface.service";

// Token lib
import { TokenStorageService } from "../../services/token-storage.service";

// Routing
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

//RxJS
import { map, share, catchError } from "rxjs/operators";
import { from } from "rxjs";
import { Observable } from "rxjs";

@Component({
  selector: "app-vendor-spec-view",
  templateUrl: "./vendor-spec-view.component.html",
  styleUrls: ["./vendor-spec-view.component.scss"]
})
//View for looking at your vendor specs
export class VendorSpecViewComponent implements OnInit {
  //vendor id for specs to retrieve
  public vendor_id: number = undefined;

  public vendor_specs: any[] = [];

  public auth_profile: any = undefined;
  public token: string = "";

  constructor(
    private api: ApiInterfaceService,
    private route: ActivatedRoute,
    private tokenStore: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.vendor_id = parseInt(this.route.snapshot.paramMap.get("id")) as number;

    this.retrieveVendorSpecs();

    this.retrieveAuthToken()
      .toPromise()
      .then(() => {
        console.log(this.token);
        this.getAuthProfile();
      })
      .catch(err => {
        console.log(err);
      });
  }

  //retrieves the account from the backend server
  getAuthProfile() {
    this.api.getProfile(this.token).subscribe(profile => {
      this.auth_profile = profile;
    });
  }

  retrieveAuthToken() {
    let observable = this.tokenStore.getToken().pipe(share());

    observable.subscribe(data => {
      let token = data as string;
      if (data !== null) {
        this.token = token;
      }
    });

    return observable;
  }

  //retrieves the vendor specs for the specific vendor
  retrieveVendorSpecs() {
    this.api.getVendorSpecs().subscribe({
      next: data => {
        let all_vendor_specs = data as any[];

        let filtered_vendor_specs = all_vendor_specs.filter(spec => {
          return spec.owner == this.vendor_id;
        });

        this.vendor_specs = filtered_vendor_specs;
        console.log(this.vendor_specs);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  //deletes the vendor spec
  deleteVendorSpec(e, vendor_spec_id) {
    //delete the vendor spec
    this.api
      .deleteVendorSpec(this.token as string, vendor_spec_id as number)
      .subscribe({
        next: data => {
          console.log("success!");

          //refresh the page
          location.reload(true);
        },
        error: err => {
          console.log("unable to delete vendor spec");
        }
      });
  }
}
