import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-listing',
  templateUrl: './service-listing.component.html',
  styleUrls: ['./service-listing.component.sass']
})
export class ServiceListingComponent implements OnInit {
  five = 5
  max = 5
  readonly = true
  
  constructor() { }

  ngOnInit(): void {
  }

}
