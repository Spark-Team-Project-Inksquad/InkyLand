import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

//jquery
declare var $: any;

@Component({
  selector: "create-vendor-spec-modal",
  templateUrl: "./create-vendor-spec-modal.component.html",
  styleUrls: ["./create-vendor-spec-modal.component.scss"]
})

//deals with creation of vendor specs
export class CreateVendorSpecModalComponent implements OnInit {
  @Input() auth_profile: any;
  @Output() vendorSpecCreationEmitter: EventEmitter<any> = new EventEmitter();

  //empty version
  public new_vendor_spec_model: any = {
    owner: 0,
    type_of_print: "2D",
    material: "",
    transport: "Either",
    price_per: 2.0,
    additional_info: ""
  };

  public vendor_spec_model: any = {};

  constructor() {}

  //clears the model
  clearModel() {
    this.vendor_spec_model = Object.assign({}, this.new_vendor_spec_model);
    this.vendor_spec_model.owner = this.auth_profile.id;
  }

  //model init
  ngOnInit() {
    this.clearModel();

    $("#createSpecModal").on("show.bs.modal", e => {
      this.clearModel();
    });
  }

  //closes the modal
  closeModal() {
    var modal: any = $("#createSpecModal");
    modal.modal("hide");
  }

  //submits the vendor spec to the main vendor spec page
  submitVendorSpec() {
    this.vendorSpecCreationEmitter.emit(this.vendor_spec_model);
    this.closeModal();
  }
}
