import { Component, OnInit } from '@angular/core';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.sass']
})
export class FilterSidebarComponent implements OnInit {

  dropdownIcon = faAngleDown
  constructor() { }

  ngOnInit(): void {
  }

}
