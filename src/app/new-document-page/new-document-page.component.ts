import { Component, OnInit } from "@angular/core";

// Api lib
import { HttpClient } from "@angular/common/http";
import { ApiInterfaceService } from "../services/api-interface.service";

// Token lib
import { TokenStorageService } from "../services/token-storage.service";

// Routing
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-new-document-page",
  templateUrl: "./new-document-page.component.html",
  styleUrls: ["./new-document-page.component.scss"]
})
export class NewDocumentPageComponent implements OnInit {
  //The document file
  public doc_file: File;

  //The selected document type for the document w/ options
  public selected_document_type: any;
  public document_type_options: any;

  //user auth token + profile
  private userToken: string;
  private profile: any;

  constructor(
    private api: ApiInterfaceService,
    private tokenStore: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //retrieve the auth token
    //then retreive the user profile
    this.tokenStore.getToken().subscribe(data => {
      let token = data as string;
      if (data !== null) {
        this.userToken = token;
        this.getProfile();
      }
    });

    this.getDocumentTypeOptions();
  }

  //retrieves the list of document type options
  getDocumentTypeOptions() {
    this.api.getDocumentTypes().subscribe(document_types => {
      this.document_type_options = document_types;
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

    let payload = {
      uploaded_file: this.doc_file,
      document_type: this.selected_document_type
    };

    //FIXME Make the api request
    this.api.createDocument(this.userToken, this.profile.id, payload);
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.doc_file = file;
      let extension: string = this.doc_file.name.split(".").pop();
      console.log("extension!");
      console.log(extension);

      for (var i = 0; i < this.document_type_options.length; i++) {
        let document_type_option = this.document_type_options[i];
        let document_extension = document_type_option["extension"];
        if (document_extension == "." + extension) {
          this.selected_document_type = document_type_option["id"];
        }
      }
    }
  }
}
