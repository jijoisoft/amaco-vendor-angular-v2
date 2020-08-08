import { Component, OnInit } from '@angular/core'; 
import { ApiService } from '../api.service';
import { stringify } from '@angular/compiler/src/util';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  rate = 1
  max = 1
  one = 1
  readonly = true
  ordersCount: 0
  listingsCount: 0
  customersCount: 0
  reviewsCount: 0
  ratingsSummary: {}
  totalAmount: 0
  reviews = []
  orders = []
  userImageBase = ""
  listingImageBase = ""
  averageRating: 0
  totalReviewsCount: 0

  constructor(private apiService: ApiService, private spinner: NgxSpinnerService) { }

  showSpinner(): void {
    this.spinner.show();

  }
  hideSpinner(): void {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }
  ngOnInit(): void {
    this.loadItems()  
    this.loadOrders()
  }
   
  loadItems() { 
    this.showSpinner()
    this.apiService.getSummary().subscribe((data) => { 
      //console.log("Data ");
      //console.log(JSON.stringify(data))
      this.userImageBase = data.userImageBase
      this.reviews = data.reviews?data.reviews:[];  
      this.ratingsSummary = data.ratingsSummary
      this.listingsCount = data.listingsCount
      this.customersCount = data. customersCount
      this.reviewsCount =  data.reviewsCount
      this.ordersCount = data.ordersCount
      this.totalAmount =  data.totalAmount
      this.hideSpinner()
      
    })
    
  }
  loadOrders() {
    this.apiService.getMyOrders(2).subscribe((data)=> {
      this.orders = data.items
      this.listingImageBase = data.listingImageBase
    })
  }


} 
