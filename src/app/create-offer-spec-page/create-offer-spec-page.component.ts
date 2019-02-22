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

  public model:any = {
    printing_offer: null,
    description: '',
    printing_mediums: [],
    document_types: []
  }

  constructor(
    private api: ApiInterfaceService,
    private tokenStore: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    //TODO
    // retrieve the stored user token
    // retrieve the printing offer id
    // set printing offer in spec_model
    //retrieve a set of printing medium options
    //retrieve a set of document type options
  }

  ngOnInit() {
  }

  //creates/updates a offer spec
  createOrEditOfferSpec() {

  }

}
