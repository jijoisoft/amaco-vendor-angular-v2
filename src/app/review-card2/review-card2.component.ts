import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-review-card2',
  templateUrl: './review-card2.component.html',
  styleUrls: ['./review-card2.component.sass']
})
export class ReviewCard2Component implements OnInit {

  constructor() { }
  max = 5 
  user = {avatar_image:null,name: null}
  readonly = true  
  listing
  defaultListingImage = "assets/placeholders/listing.png"
  defaultUserImage = "assets/placeholders/avatar.png"
  @Input() review: any 
  @Input() listingImageBase: any 
  @Input() userImageBase: any 

  ngOnInit(): void {
   
    this.user = this.review.user
    this.listing = this.review.listing
    this.listing.main_image = this.listing.main_image ?this.listingImageBase+this.listing.main_image:this.defaultListingImage
    console.log(JSON.stringify(this.review))
    this.user.avatar_image = this.user.avatar_image?this.userImageBase+this.user.avatar_image:this.defaultUserImage
    
  }
}
