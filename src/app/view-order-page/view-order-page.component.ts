import { Component, OnInit } from '@angular/core';

//routing
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

// api
import { HttpClient } from "@angular/common/http";
import { ApiInterfaceService } from "../services/api-interface.service";

// Token lib
import { TokenStorageService } from "../services/token-storage.service";


@Component({
  selector: 'app-view-order-page',
  templateUrl: './view-order-page.component.html',
  styleUrls: ['./view-order-page.component.scss'],
  providers: [ApiInterfaceService, HttpClient, TokenStorageService]
})
// view order page
export class ViewOrderPageComponent implements OnInit {

  //order object
  public order:any = null;
  private authToken:string = "";
  private order_id: number = null;

  constructor(
    private api: ApiInterfaceService,
    private tokenStore: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.order_id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.tokenStore
      .getToken()
      .subscribe((token) => {
        this.tokenStore = token;

        // get the order after getting auth token
        getOrder();
      })

  }

  //retrieve the order
  getOrder() {

    

  }

}
