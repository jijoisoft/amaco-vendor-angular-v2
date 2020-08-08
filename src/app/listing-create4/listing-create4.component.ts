import { Component, OnInit } from '@angular/core';

import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-listing-create4',
  templateUrl: './listing-create4.component.html',
  styleUrls: ['./listing-create4.component.sass']
})
export class ListingCreate4Component implements OnInit {
  likeIcon = faThumbsUp
  constructor() { }

  ngOnInit(): void {
  }

}
