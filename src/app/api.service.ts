import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from "../environments/api";
import { BASE_URL_TWO } from "../environments/api";
import { newArray, stringify } from '@angular/compiler/src/util';
import { last } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {

  }
  public getFullUrl(url) {
    return `${BASE_URL}/${url}`
  }
  public getFullUrl2(url) {
    return `${BASE_URL_TWO}/${url}`
  }
  public getCatalogueSummary() {
    var url = this.getFullUrl('catalogue/summary')
    return this.httpClient.get<any>(url)
  }
  public getListings(filters) { 
   
    var url = this.getFullUrl('catalogue/listings')
    return this.httpClient.get<any>(url, { params: filters })
  }
  public getServicesListing() {
    var url = this.getFullUrl('catalogue/listings' + '?is_service=1')
    return this.httpClient.get<any>(url)
  }
  public getEquipmentsDetail(slug) {
    var url = this.getFullUrl(`catalogue/listings/details/${slug}`)
    return this.httpClient.get<any>(url)
  }
  public getReviews(page, perPage) {
    page = page || 1
    perPage = perPage || 30
    var url = this.getFullUrl(`catalogue/reviews?page=${page}&perPage=${perPage}`)
    return this.httpClient.get<any>(url)
  }
  public getSummary() { 
    var url = this.getFullUrl(`account/summary`)
    return this.httpClient.get<any>(url)
  }
  public getCompanyInfo() { 
    var url = this.getFullUrl(`account/self/company-details`)
    return this.httpClient.get<any>(url)
  }
  public updateCompanyInfo(formData) {
    var url = this.getFullUrl(`account/self/company-details`)
    return this.httpClient.patch<any>(url, formData)
  }
  public getListingDetails(listing_id) {
    var url = this.getFullUrl(`catalogue/listings/${listing_id}`)
    return this.httpClient.get<any>(url)
  }
  
  public getCategories(filter = {}) {
    var url = this.getFullUrl(`catalogue/categories`)
    return this.httpClient.get<any>(url, { params: filter })
  }
  public getCities(filter = {}) {
    var url = this.getFullUrl(`catalogue/cities`)
    return this.httpClient.get<any>(url, { params: filter })
  }
  public getMyOrders(perPage) {
    var url = this.getFullUrl(`cart/orders?perPage=${perPage}`)
    return this.httpClient.get<any>(url)
  }
  public getOrderDetails(id) {
    var url = this.getFullUrl(`cart/orders/${id}`)
    return this.httpClient.get<any>(url)
  }
  public getMyCart() {
    var url = this.getFullUrl(`cart/items`)
    return this.httpClient.get<any>(url)
  }
  public changeStatus(itemId, statusValue) {
    console.log("API called with new status value " + statusValue)
    var url = this.getFullUrl(`cart/orders/${itemId}/delivery-status`)
    return this.httpClient.patch<any>(url, {
      delivery_status: statusValue
    })
  }
  public login(email, password) {
    var url = this.getFullUrl(`account/authenticate`)
    return this.httpClient.post<any>(url, { email: email, password: password })
  }
  public signUp(formData) {
    var url = this.getFullUrl2('account')
    console.log("Data is ");
    console.log(JSON.stringify(formData));
    return this.httpClient.post<any>(url, formData)
  }
  public signUpTwo(firstName, middleName, lastName, alternatePhone, address) {
    var url = this.getFullUrl('account/signuptwo')
    return this.httpClient.post<any>(url, {
     firstName: firstName,
     middleName: middleName,
     lastName: lastName,
     alternatePhone: alternatePhone,
     address: address
    })
  }
  public sendOtp(phone) {
    var url = this.getFullUrl('account/otp/send')
    return this.httpClient.post<any>(url, {
      phone: phone
    })
  }
  public sendEnquiry(subject, message) {
    var url = this.getFullUrl('content/enquiries')
    return this.httpClient.post<any>(url, {
      subject: subject,
      message: message
    })
  }
  public verifyOtp(phone, otp, token) {
    var url = this.getFullUrl('account/otp/verify')
    return this.httpClient.post<any>(url, {
      phone: phone,
      otp: otp,
      token: token
    })
  }
  
  public editProfile(formData) {
    var url = this.getFullUrl('account/self') 
    return this.httpClient.patch<any>(url, formData)
  }
  public addToCart(listingId, quantity, durationDays, durationWeeks, durationMonths) {
    var url = this.getFullUrl(`cart/items`)
    return this.httpClient.post<any>(url, {
      quantity: quantity,
      duration_days: durationDays,
      duration_weeks: durationWeeks,
      duration_months: durationMonths,
      duration_hours: 0,
      listing_id: listingId
    })
  }
  public getProfile() {
    var url = this.getFullUrl(`account/self`)
    return this.httpClient.get<any>(url)
  }

  public checkAccountExists(phone) {
    var url2 = this.getFullUrl2('account/is-existing')
    return this.httpClient.get<any>(url2, {
      params: {
        phone: phone
      }
    })
  }
  public createListingOne(name, slug, description, shortDescription, quantity, tags, category_id) {
    var url = this.getFullUrl('listings/create')
    return this.httpClient.post<any>(url, {
      name: name,
      slug: slug,
      description: description,
      quantity: quantity,
      tags: tags,
      category_id: category_id
    })
  }
  public createListingTwo(enableDailyPrice, dailyPrice, enableWeeklyPrice, weeklyPrice, enableMonthlyPrice, monthlyPrice) {
    var url = this.getFullUrl('listings/create')
   
    return this.httpClient.post<any>(url, {
      enableDailyPrice: enableDailyPrice,
      enableWeeklyPrice: enableWeeklyPrice,
      enableMontlyPrice: enableMonthlyPrice,
      dailyPrice: dailyPrice, 
      weeklyPrice: weeklyPrice,
      monthlyPrice: monthlyPrice
    })
  }
  public createListingThree(attachments, specfiation) {
    var url = this.getFullUrl('listings/create')
    return this.httpClient.post<any>(url, {
      attachments: attachments,
      specfiation: specfiation
    })
  }

}
