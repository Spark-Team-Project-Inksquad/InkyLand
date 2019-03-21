import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"]
})
export class HomePageComponent implements OnInit {
  private vendors: any[] = [];

  constructor() {}

  //Generates a list of dummy vendors
  generateDummyVendors(amount: number) {
    let dummy_vendors: any[] = [];

    let colors = ["pink", "yellow", "blue", "black"];

    let dummyVendor = {
      name: "dummy vendor"
    };

    for (let i = 0; i < amount; i++) {
      let vendor_color = colors[i % colors.length];
      let new_vendor = Object.assign({ color: vendor_color }, dummyVendor);
      dummy_vendors.push(new_vendor);
    }

    return dummy_vendors;
  }

  //generates 2 dimension version of vendors list
  getVendorGrid(items_per_row: number) {
    let rows = Math.ceil(this.vendors.length / items_per_row);
    let vendor_grid: any = [];
    let vendor_i = 0;
    for (let y = 0; y < rows; y++) {
      let vendor_row: any[] = [];
      for (let x = 0; x < items_per_row; x++) {
        if (vendor_i == this.vendors.length) {
          break;
        }
        vendor_row.push(this.vendors[vendor_i]);
        vendor_i++;
      }
      vendor_grid.push(vendor_row);
    }
    return vendor_grid;
  }

  ngOnInit() {
    this.vendors = this.generateDummyVendors(10);
  }
}
