import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass']
})

export class OrdersComponent implements OnInit {
  orders = []
  imageBase = ""
  listingImageBase = ""
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
  getOrders() {
    this.showSpinner();
    this.apiService.getMyOrders(30).subscribe((data) => {
      if (data.success) {
        this.orders = data.items
        this.imageBase = data.imageBase
        this.listingImageBase = data.listingImageBase
      }
      else
      {
        //Handle Error here
        console.log("No items")
      }
      this.hideSpinner();
    })
  }

  

  ngOnInit(): void {
    this.getOrders()
  }

}
