import { Component, OnInit } from '@angular/core';
import { faSlidersH,faSearch,faTimes,faPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.sass']
})
export class ServicesComponent implements OnInit {
  searchIcon = faSearch
  slidersIcon = faSlidersH
  closeIcon = faTimes
  plusIcon = faPlus
  constructor() { }

  ngOnInit(): void {
  }

}
