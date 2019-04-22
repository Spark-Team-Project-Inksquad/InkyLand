import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'price-popup-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.scss']
})
export class PriceFilterComponent implements OnInit {

  @Input('for') for_id:string;

  constructor() { }

  ngOnInit() {
  }

}
