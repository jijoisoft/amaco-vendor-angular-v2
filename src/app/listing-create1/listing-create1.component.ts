import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { ApiService } from '../api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr'; 
import { stringify } from '@angular/compiler/src/util';
@Component({
  selector: 'app-listing-create1',
  templateUrl: './listing-create1.component.html',
  styleUrls: ['./listing-create1.component.sass']
})
export class ListingCreate1Component implements OnInit {
  //Initialisation of form variables
  categoriesList
  listing_id = 0
  tags
  mainImageFiles = []
  subImageFiles = []
  mainImageUrl
  isEquipment
  isService
  errors: any = {}
  files = []
  validators
  errorMessages
  listingCreateForm = new FormGroup({
    id: new FormControl(""),
    title: new FormControl(""),
    slug: new FormControl(""),
    description: new FormControl(""),
    quantity: new FormControl(0),
    tags: new FormControl(""),
    category_id: new FormControl(0),
    short_description: new FormControl("")
  });
  showSpinner(): void {
    this.spinner.show();
  }
  hideSpinner(): void {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }
  generateSlug()
  {
      var title = this.listingCreateForm.value.title
      var slug =  title
          .toLowerCase()
          .replace(/[^\w ]+/g,'')
          .replace(/ +/g,'-')
          ;
      this.listingCreateForm.patchValue({slug: slug})
  }
  
  onMainImageFileSelect(event) { 
    this.mainImageFiles = [];
    this.mainImageFiles.push(...event.addedFiles); 
     
  }

  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = e => {
        return resolve((e.target as FileReader).result);
      };
  
      reader.onerror = e => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };
  
      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }
  
      reader.readAsDataURL(file);
    });
  }

  onMainImageFileRemove(event) { 
    this.mainImageFiles.splice(this.mainImageFiles.indexOf(event), 1); 
  }
  onSubImageFileSelect(event) {  
    this.subImageFiles.push(...event.addedFiles);  
  }
  onSubImageFileRemove(event) { 
    this.subImageFiles.splice(this.subImageFiles.indexOf(event), 1); 
  }
  
  initializeValues(listing_id) {
    this.showSpinner()
    this.apiService.getListingDetails(listing_id).subscribe((data => {
      if (data.success) {
        console.log("Data fetched is ")
        console.log(JSON.stringify(data))
        this.listingCreateForm.patchValue({
          title: data.title,
          slug: data.slug,
          description: data.description,
          quantity: data.quantity,
          category_id: data.category_id,
          short_description: data.short_description,
          tags: data.tags
        }) 
      }
      else {

      }
      
      this.hideSpinner()
    }))
  }
  saveListing() {
    console.log("Save listing called...")
    var title = this.listingCreateForm.value.title
    var slug = this.listingCreateForm.value.slug
    var description = this.listingCreateForm.value.description
    var quantity = this.listingCreateForm.value.quantity
    var tags = this.tags
    var categoryId = this.listingCreateForm.value.category_id
    var shortDescription = this.listingCreateForm.value.shortDescription

    
    this.showSpinner()
    
    const formData: FormData = new FormData();
    
    formData.append('title', title);
    formData.append('slug', slug);
    formData.append('description', description);
    formData.append('short_description', shortDescription);
    formData.append('quantity', quantity);
    formData.append('category_id', categoryId);
 
    var tagsToPost = [];
    for(var tag of tags) {
      tagsToPost.push(tag.value)
    }

    var newTags = tagsToPost.join(','); 
    formData.append('tags', newTags);

    this.readFile(this.mainImageFiles[0]).then(mainImageFileContents => { 
      
      
      
        // if(mainImageFileContents)  { 
        //   formData.append('main_image', mainImageFileContents, mainImageFileContents.name);
        // }


    })
    if(this.listing_id) {
      var params = { listing_id : this.listing_id}
      //call update api for profile update step one with about variales 
    }
    else {
      /*this.apiService.createListingOne(name, slug, description, shortDescription, quantity, tags, category_id).subscribe(
      (data) => {
        console.log(data)
        this.router.navigate(['listings/create2'])
      }
    ) */
     // this.router.navigate(['listings/create2'])
    }
    
  }
  constructor(private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    const allParams = this.activatedRoute.snapshot.queryParams
    
    var url = this.activatedRoute.url._value[0].path;  
    var isEquipment = url == 'equipments'?1:0;
    var isService = !isEquipment?1:0;
    this.isEquipment = isEquipment
    this.isService = isService

    if (allParams.listing_id) {
      this.listing_id = allParams.listing_id
      this.initializeValues(allParams.listing_id)
    }
    isEquipment = this.isEquipment
    isService = this.isService
    this.apiService.getCategories({has_equipments: isEquipment, has_services: isService}).subscribe((data) => {
      this.categoriesList = data.items ? data.items : []
    })
  }


}
