import { Component, OnInit } from '@angular/core';
import { faSlidersH, faSearch, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';
import { stringify } from '@angular/compiler/src/util';
import { Router, ActivatedRoute } from '@angular/router'
import { NgxSpinnerService } from "ngx-spinner";
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.sass']
})
export class ListingsComponent implements OnInit {
  searchIcon = faSearch
  slidersIcon = faSlidersH
  closeIcon = faTimes
  plusIcon = faPlus
  listings = {
    items: []
  }
  page = 1
  perPage = 4
  totalItems = 0
  filterObject = {}
  selectedPage = ""
  listingPostingLink="listings/create";
  
  loadPage(page: number) {
    console.log("loadPage function called with page " + page)
    this.filterObject['page'] = page
    this.loadListings();
  }

  loadListings() {
    console.log("Filter Object is " + JSON.stringify(this.filterObject))
    this.showSpinner()
    this.apiService.getListings(this.filterObject).subscribe((data) => {
      if (data.success) {
        this.listings = data;
        this.perPage = data.pagination.perPage
        this.page = data.pagination.page
        this.totalItems = data.pagination.totalItemsCount
        console.log(" Per Page " + this.perPage + " Page " + this.page + " Total items" + this.totalItems  )
      }
      else {

      } 
      this.hideSpinner()
    })


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
  constructor(private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute,private spinner: NgxSpinnerService) { }
  ngOnInit(): void { 
    const allParams = this.activatedRoute.snapshot.queryParams
    var url = this.activatedRoute.url._value[0].path;  
    var isEquipment = url == 'equipments'?1:0;
    var isService = !isEquipment?1:0;
    
    if (allParams.keyword)
      this.filterObject['keyword'] = allParams.keyword
    if (allParams.category_id) 
      this.filterObject['category_id'] = allParams.category_id
    if (isEquipment){
      this.filterObject['is_equipment'] = isEquipment
      console.log("Is equipment...")
      this.selectedPage = "equipments"
      this.listingPostingLink = "/equipments/create" 
    }
    if (isService) { 
      this.filterObject['is_service'] = isService
      this.selectedPage = "services"
      this.listingPostingLink = "/services/create"
    }
      
    if (allParams.perPage)
      this.filterObject['perPage'] = allParams.perPage
    else 
      this.filterObject['perPage'] = 5
    if (allParams.page)
      this.filterObject['page'] = allParams.page

      
    this.loadListings()
  }

}
