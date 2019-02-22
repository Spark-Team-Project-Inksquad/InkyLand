import { Component, OnInit } from '@angular/core';

//routing
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

// Api lib
import { HttpClient } from "@angular/common/http";
import { ApiInterfaceService } from "../services/api-interface.service";

// Token lib
import { TokenStorageService } from "../services/token-storage.service";

@Component({
  selector: 'app-create-offer-spec-page',
  templateUrl: './create-offer-spec-page.component.html',
  styleUrls: ['./create-offer-spec-page.component.scss'],
  providers: [ApiInterfaceService, HttpClient, TokenStorageService]
})

//handles creation and updating of offer specs
export class CreateOfferSpecPageComponent implements OnInit {

  //ex
  /**
  {
        "id": 2,
        "printing_offer": 1,
        "description": "My printer does not support printing Microsoft word documents out of the box. \r\n\r\nSo $1.50 per page",
        "printing_mediums": [
            1
        ],
        "document_types": [
            2
        ]
    }
  **/

  //main form model for offer spec
  public model:any = {
    printing_offer: null,
    description: '',
    printing_mediums: [],
    document_types: []
  }

  //option lists for printing mediums and document types
  public printing_mediums:any[] = [];
  public document_types:any[] = [];

  //for auth
  private userToken:string = "";

  constructor(
    private api: ApiInterfaceService,
    private tokenStore: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // retrieve the stored user token
    this.tokenStore.getToken().subscribe(data => {
      let token: string = data as string;

      if (data !== null) {
        //save user token
        this.userToken = token;
      }
    });

    // retrieve the printing offer id
    // set printing offer in spec_model
    this.model['printing_offer'] = this.route.snapshot.paramMap.get("id");

    //retrieve a set of document type options
    this.api.getDocumentTypes()
      .subscribe((document_types) => {
        this.document_types = document_types;
      })

    //retrieve a set of printing medium options
    this.api.getPrintingMediums()
      .subscribe((printing_mediums) => {
        this.printing_mediums = printing_mediums;
      })
  }

  ngOnInit() {
  }

  //creates/updates a offer spec
  //TODO
  createOrEditOfferSpec() {
    console.log(this.model);
    //make api request ot create offer spec
    this.api.createOfferSpec(this.userToken, this.model)
      .subscribe((offer_spec) => {
        console.log(offer_spec);
        alert("Offer created")
        this.router.navigate(['/printing-offer/' + this.model['printing_offer']]);
      });
    //redirect back to offer page
  }

}
