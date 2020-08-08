import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.sass']
})
export class ReviewsComponent implements OnInit {

  constructor(private apiService: ApiService, private spinner: NgxSpinnerService) { }
  reviews = {items:[]}
  userImageBase = ""
  listingImageBase = ""
  page = 1
  perPage = 30
  ngOnInit(): void {
    this.loadItems()
  }
  getReviews():  void {
    
  }
  showSpinner(): void {
    this.spinner.show();
  }
  
  hideSpinner(): void {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }
  loadItems() { 
    this.showSpinner();
    this.apiService.getReviews(this.page,this.perPage).subscribe((data) => { 
      if (data.success) {
        this.reviews = data; 
        //this.perPage = data.pagination.perPage
        //this.page = data.pagination.perPage
        //this.totalItems = data.pagination.totalItemsCount
      } 
      this.hideSpinner();
    })


  }

}
