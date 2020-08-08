import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.sass']
})
export class ReviewCardComponent implements OnInit {
  max = 5
  rating = "5.0"
  content = ""
  timestamp = ""
  readonly = true  
  user = {avatar_image:"", name:""} 
  defaultListingImage = "assets/placeholders/listing.png"
  defaultUserImage = "assets/placeholders/avatar.png"
  @Input() review: any 
  @Input() listingImageBase: any 
  @Input() userImageBase: any 
  constructor() { }

  ngOnInit(): void {
    
    this.user = this.review.user   
    this.user.avatar_image = this.user.avatar_image?this.userImageBase+this.user.avatar_image:this.defaultUserImage
    
  }

}
