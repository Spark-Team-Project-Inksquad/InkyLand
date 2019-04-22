import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'quantity-popup-filter',
  templateUrl: './quantity-filter.component.html',
  styleUrls: ['./quantity-filter.component.scss']
})
export class QuantityFilterComponent implements OnInit {

  @Input('for') for_id:string;


  constructor() { }

  ngOnInit() {
  }

}
