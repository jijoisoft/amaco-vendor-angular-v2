import { Component, OnInit } from '@angular/core';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from  '@angular/router'

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.sass']
})
export class OrderDetailsComponent implements OnInit {
  statusList = [
  ]
  id
  currentStatus
  selected = true
  statusId = "select"
  backIcon = faAngleLeft
  orderItems = []
  orderId 
  subTotal = ""
  extra = ""
  totalPrice = ""
  //User Details
  userImageUrl = ""
  userName = ""
  userEmail = ""
  userPhone = ""
  listingImageBase = ""


  constructor(private apiService: ApiService, private spinner: NgxSpinnerService, private activatedRoute: ActivatedRoute) { }
  showSpinner(): void {
    this.spinner.show();
  }
  hideSpinner(): void {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }
  updateStatus() {
    var itemId = this.id
    this.showSpinner();
    var newStatus = this.statusId
    this.apiService.changeStatus(itemId, newStatus).subscribe((data)=> {
      if(data) {
            this.currentStatus = this.statusId
      }
    })
    this.hideSpinner();
  }
  getOrderDetails() {
    var id = this.id
    this.showSpinner();
    this.apiService.getOrderDetails(id).subscribe((data) => {
      if (data.success) {
        this.orderId = data.reference_id
        this.subTotal = data.sub_total_amount
        this.extra = data.vat_amount
        this.totalPrice = data.total_amount
        this.userImageUrl = data.userImageBase + data.user.avatar_image
        this.userName = data.user.name
        this.userPhone = data.user.phone
        this.userEmail = data.user.email
        this.orderItems = data.items
        this.listingImageBase = data.listingImageBase
        this.statusList = data.delivery_status_list

        for(var i=0; i<this.statusList.length; i++) {
          if(this.statusList[i].is_current == 1) {
            this.statusId = this.statusList[i].name
            this.currentStatus = this.statusList[i].name
          }
        }
        
      }
      else {

      }

      this.hideSpinner();
    })
  }
  ngOnInit(): void {
    const allParams = this.activatedRoute.snapshot.queryParams
    this.id = allParams.id

    this.getOrderDetails()
  }
}
