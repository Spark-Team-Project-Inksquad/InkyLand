import { Component, OnInit } from "@angular/core";

// Api lib
import { HttpClient } from "@angular/common/http";
import { ApiInterfaceService } from "../services/api-interface.service";

// Token lib
import { TokenStorageService } from "../services/token-storage.service";

// Routing
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: "app-new-document-page",
  templateUrl: "./new-document-page.component.html",
  styleUrls: ["./new-document-page.component.scss"]
})
export class NewDocumentPageComponent implements OnInit {
  public doc_file: File;
  private userToken: string;
  private profile: any;

  constructor(private api: ApiInterfaceService, private tokenStore: TokenStorageService,private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.tokenStore.getToken().subscribe(data => {
      let token = data as string;
      if (data !== null) {
        this.userToken = token;
        this.getProfile();
      }
    });
  }

  //retrieves the account from the backend server
  getProfile() {
    this.api.getProfile(this.userToken).subscribe(profile => {
      this.profile = profile;
    });
  }

  // uploads the document to the server
  uploadDocument() {
    console.log(this.doc_file);

    this.api.createDocument(this.userToken, this.profile.id, this.doc_file);

    //Make the api request
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.doc_file = file;
    }
  }
}
