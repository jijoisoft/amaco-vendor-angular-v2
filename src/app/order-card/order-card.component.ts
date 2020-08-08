import { Component, OnInit, Input } from '@angular/core';
import {Router } from '@angular/router'

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.sass']
})
export class OrderCardComponent implements OnInit {

  listingImage = ""
  listingTitle = ""
  moreItems = ""
  referenceId = ""
  subTotalAmount = ""
  userName = ""
  userEmail = ""
  userPhone = ""
  isConfirmed = false
  isCancelled= false
  createdAt = ""
  userSummary = "" 
  totalAmount = ""

  @Input() order: any
  @Input() imageBase: any
  @Input() listingImageBase: any
  constructor(private router: Router) { }
  loadItems() {
    if (this.order.latest_item.listing.title)
      this.listingTitle = this.order.latest_item.listing.title
    if (this.order.latest_item.listing.main_image) {
      this.listingImage = this.listingImageBase + this.order.latest_item.listing.main_image
    }
    if(this.order.items_count)  {
      var moreItems = (this.order.items_count - 1)
      if(moreItems==1) {
        this.moreItems = String(moreItems)
        this.moreItems = "+ " + this.moreItems + " more item"
      }
      if(moreItems>1){
        this.moreItems = String(moreItems)
        this.moreItems = "+ " + this.moreItems + " more items"
      }        
    }
    if(this.order.reference_id) {
      this.referenceId = this.order.reference_id
    }
    if(this.order.sub_total_amount) {
      this.subTotalAmount = this.order.sub_total_amount
    }
    if(this.order.total_amount) {
      this.totalAmount = this.order.total_amount
    }
    var user = this.order.user;
    var name = user&&user.name?user.name:""
    var email = user&&user.email?user.email:""
    var phone = user&&user.phone?user.phone:""
    name = name || name.trim()
    email = email || email.trim()
    phone = phone || phone.trim() 

    this.userName = name
    this.userEmail =  email
    this.userPhone = phone
   
    if(this.order.is_confirmed)
      this.isConfirmed = true
    if(this.order.is_cancelled) 
      this.isCancelled = true
    if(this.order.created_at)
      this.createdAt = this.order.created_at
  
    var userSummary: any  =  [] 
    if(name)  {
      userSummary.push(name)
    }
    if(email)  userSummary.push(email)
    if(phone)  userSummary.push(phone)
    userSummary = userSummary.join(' | ')
    this.userSummary = userSummary

     

  }
  goToOrderDetails() {
    this.router.navigate(['order-details'], {
      queryParams: {
        id: this.order.id
      }
    })
  }
  ngOnInit(): void {
    this.loadItems()
  }


}
