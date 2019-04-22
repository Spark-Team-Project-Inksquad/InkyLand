import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'distance-popup-filter',
  templateUrl: './distance-filter.component.html',
  styleUrls: ['./distance-filter.component.scss']
})
export class DistanceFilterComponent implements OnInit {

  @Input('for') for_id:string;

  constructor() { }

  ngOnInit() {
  }

}
