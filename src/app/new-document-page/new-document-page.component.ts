import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-new-document-page",
  templateUrl: "./new-document-page.component.html",
  styleUrls: ["./new-document-page.component.scss"]
})
export class NewDocumentPageComponent implements OnInit {
  public doc_file: File;

  constructor() {}

  ngOnInit() {}

  //TODO uploads the document to the server
  uploadDocument() {
    console.log(this.doc_file);
    let formData: FormData = new FormData();
    formData.append("uploaded_file", this.doc_file);
    console.log(formData);

    //Make the api request
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.doc_file = file;
    }
  }
}
