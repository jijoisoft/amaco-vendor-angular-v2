import { Component, OnInit } from '@angular/core';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import { DxRangeSliderModule, DxNumberBoxModule } from 'devextreme-angular';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.sass']
})
export class RangeSliderComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }

}
