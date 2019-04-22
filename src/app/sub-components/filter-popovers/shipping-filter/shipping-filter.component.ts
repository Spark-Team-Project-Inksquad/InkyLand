import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shipping-filter',
  templateUrl: './shipping-filter.component.html',
  styleUrls: ['./shipping-filter.component.scss']
})
export class ShippingFilterComponent implements OnInit {

  @Input('for') for_id:string;

  constructor() { }

  ngOnInit() {
  }

}
