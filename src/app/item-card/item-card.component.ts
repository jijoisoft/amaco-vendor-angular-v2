import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service'
@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.sass']
})
export class ItemCardComponent implements OnInit {
  @Input() orderItem: any
  @Input() listingImageBase: any

  listingTitle
  listingSlug
  listingMainImage
  quantity
  ratePerQuantity
  totalPrice
  addedDateTime
  duration
  constructor(private apiService: ApiService) { }
  loadValues() {
    this.listingTitle = this.orderItem.listing.title
    this.listingSlug = this.orderItem.listing.slug
    this.listingMainImage = this.listingImageBase +  this.orderItem.listing.main_image
    this.quantity = this.orderItem.quantity
    this.ratePerQuantity = this.orderItem.rate_per_quantity
    this.totalPrice = this.orderItem.quantity
    this.addedDateTime = this.orderItem.added_datetime
    this.duration = this.orderItem.duration
  }
  ngOnInit(): void {
    this.loadValues()
  }


}
