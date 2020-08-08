import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { ApiService } from '../api.service';


@Component({
  selector: 'app-listing-create2',
  templateUrl: './listing-create2.component.html',
  styleUrls: ['./listing-create2.component.sass']
})
export class ListingCreate2Component implements OnInit {
  listing_id = 0
  listingCreateTwo = new FormGroup({
    enableDailyPrice: new FormControl(true),
    dailyPrice: new FormControl(''),
    enableWeeklyPrice: new FormControl(true),
    weeklyPrice: new FormControl(''),
    enableMonthlyPrice: new FormControl(true),
    monthlyPrice: new FormControl(0)
  });
  constructor(private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute) { }
  listingCreateTwoSubmit() {
    var enableDailyPrice = this.listingCreateTwo.value.enableDailyPrice
    var enableWeeklyPrice = this.listingCreateTwo.value.enableWeeklyPrice
    var enableMonthlyPrice = this.listingCreateTwo.value.enableMonthlyPrice
    var dailyPrice = this.listingCreateTwo.value.dailyPrice
    var weeklyPrice = this.listingCreateTwo.value.weeklyPrice
    var monthlyPrice = this.listingCreateTwo.value.monthlyPrice

    if (this.listing_id) {
      var params = { listing_id: this.listing_id }
      //call update api for profile update step one with about variales
      this.router.navigate(['listings/create3'], { queryParams: params })
    }
    else {
      /*this.apiService.createListingOTwo().subscribe(
      (data) => {
        console.log(data)
        this.router.navigate(['listings/create2'])
      }
    ) */
      this.router.navigate(['listings/create3'])
    }
  }
  initializeValues(listing_id) {
    this.apiService.getListingDetails(listing_id).subscribe((data => {
      if (data.success) {
        if (data.daily_price) {
          var enableDailyPrice = true
          var dailyPrice = data.daily_price
        }
        if (data.weekly_price) {
          var enableWeeklyPrice = true
          var weeklyPrice = data.weekly_price
        }
        if (data.monthly_price) {
          var enableMonthlyPrice = true
          var monthlyPrice = data.monthly_price
        }

        this.listingCreateTwo.patchValue({
          enableDailyPrice: enableDailyPrice,
          dailyPrice: dailyPrice,
          enableWeeklyPrice: enableMonthlyPrice,
          weeklyPrice: monthlyPrice,
          enableMonthlyPrice: enableWeeklyPrice,
          monthlyPrice: weeklyPrice
        })
      }
      else {

      }
    }))
  }
  ngOnInit(): void {
    const allParams = this.activatedRoute.snapshot.queryParams
    if (allParams.listing_id) {
      console.log("listing id detected in all params")
      this.listing_id = allParams.listing_id
      this.initializeValues(allParams.listing_id)
    }
  }

}
