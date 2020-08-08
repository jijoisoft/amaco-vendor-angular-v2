import { Component, OnInit, Input } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-listing-item',
  templateUrl: './listing-item.component.html',
  styleUrls: ['./listing-item.component.sass']
})
export class ListingItemComponent implements OnInit {
  
  //For star rating
  max = 5
  readonly = true
  averageRating = 0
  created_at = ""
  city = ""
  isFeatured = 0
  mainImage = "assets/images/placeholders/forklift.png"
  categoryName = ""
  price = ""
  title = ""
  priceUnit = ""
  previewLink = ""
  images = []
  isPublished
  notIsPublished
  @Input() equipment: any
  @Input() imageBase: any
  @Input() pageBase: any
  constructor(private router: Router) { }
  unpublishLink() {
    //Call unpublish api
    console.log("Here unpublish api willbe called")
    this.loadValues()
  }
  updateDetailsLink() {
    var params = {
      listing_id: this.equipment.id
    }
    this.router.navigate(['listings/create'], {
      queryParams: params
    })

  }
  loadValues() {
    this.title = this.equipment.title
    this.isFeatured = this.equipment.is_featured
    this.averageRating = this.equipment.average_rating

    if (this.equipment.category) {
      this.categoryName = this.equipment.category.name
    }
    if (this.equipment.main_image) {
      this.mainImage = `${this.imageBase}${this.equipment.main_image}`
    }
    if (this.equipment.monthly_price) {
      this.price = this.equipment.monthly
      this.priceUnit = 'Month'
    }

    if (this.equipment.weekly) {
      this.price = this.equipment.weekly_price
      this.priceUnit = 'Week'
    }

    if (this.equipment.daily_price) {
      this.price = this.equipment.daily_price
      this.priceUnit = 'Day'
    }
    if (this.equipment.hourly_price) {
      this.price = this.equipment.hourly_price
      this.priceUnit = 'Hour'
    }
    if (this.equipment.created_at) {
      this.created_at = this.equipment.created_at     
    }
    if (this.equipment.city) {
      this.city = this.equipment.city     
    }
    if(this.equipment.imageBase)
      this.imageBase = this.equipment.imageBase
    
    if(this.equipment.images.length) {
      for (let i = 0; i < this.equipment.images.length; i++) {
        this.images[i] = this.imageBase + this.equipment.images[i].image
      }
    }
    if(this.equipment.slug) 
      this.previewLink = this.pageBase + this.equipment.slug
    
    console.log(this.previewLink)


    this.isFeatured = this.equipment.is_featured
    this.isPublished = this.equipment.is_published?this.equipment.is_published:0
    this.notIsPublished = !this.isPublished
  }
  ngOnInit(): void {
    this.loadValues()
  }

}
