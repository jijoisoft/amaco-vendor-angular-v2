import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { NgxSpinnerService } from "ngx-spinner";
import LocationPicker from "location-picker";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  
  //For Edit pop up
  disabled = true
  
  
  
  
  lp: LocationPicker;  
  
  
  setLocation() {
     console.log(this.lp.getMarkerPosition());
  }



  avatarUrl
  notAvatarUrl = true
  fileToUpload: File = null;
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0); 
    var reader = new FileReader();      
      reader.readAsDataURL(this.fileToUpload ); 
      reader.onload = (_event) => { 
        this.companyLogoImageUrl = reader.result; 
        console.log("File url "+this.companyLogoImageUrl);
        this.notAvatarUrl = !this.avatarUrl
      }
  }
  errors: any = {}

  companyName
  companyLogoImageUrl
  email
  phone
  alternatePhone
  createdAt
  companyAddress
  companyLat
  companyLng
  companyContactFirstName
  companyContactMiddleName
  companyContactLastName
  companyNameForDisplay
  imageBase

  
  companyForm = new FormGroup({    
    companyName: new FormControl(''),
    alternatePhone: new FormControl(''),
    companyAddress: new FormControl(''),
    companyContactFirstName: new FormControl(''),
    companyContactMiddleName: new FormControl(''),
    companyContactLastName: new FormControl(''),
  });
  
  profileForm = new FormGroup({    
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''), 
  });
  constructor(private apiService: ApiService, private spinner: NgxSpinnerService, private toastr: ToastrService) { }
  saveCompanyInfo(): void {

  }
  validateForm(): void {

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
  showSuccess() {
    this.toastr.success('Profile Successfully Updated');
  }
  editProfile() {

  }
  updateCompanyProfile() {
    var companyName = this.companyForm.value.companyName
    var alternatePhone = this.companyForm.value.alternatePhone
    var companyAddress = this.companyForm.value.companyAddress
    var companyContactFirstName = this.companyForm.value.companyContactFirstName
    var companyContactMiddleName = this.companyForm.value.companyContactMiddleName
    var companyContactLastName = this.companyForm.value.companyContactLastName
    //var companyLat = 
    //var companyLong = 
    const formData: FormData = new FormData();

    var fileToUpload = this.fileToUpload
    if(fileToUpload)  { 
      formData.append('company_logo_image', fileToUpload, fileToUpload.name);
    }

    formData.append('company_name', companyName);
    formData.append('alternate_phone', alternatePhone);
    formData.append('company_address', companyAddress);
    formData.append('company_lat', "123");
    formData.append('company_lng', "445");
    formData.append('company_contact_first_name', companyContactFirstName);
    formData.append('company_contact_middle_name', companyContactMiddleName);
    formData.append('company_contact_last_name', companyContactLastName);
    console.log("Calling api...");
    this.showSpinner();
    this.apiService.updateCompanyInfo(formData).subscribe((data) => {
      if (data.success) { 
        console.log(JSON.stringify(data))
        var companyLogoImage = ""
        if(data.company_logo_image) {
          console.log("Image base is " + data.companyImageBase)
          console.log("Image  is " + data.company_logo_image)
          companyLogoImage = data.companyImageBase + data.company_logo_image
          localStorage.setItem("company_logo_image", companyLogoImage)
        }
        this.showSuccess()
       this.getData()

      }
      else {
        console.log("Api error response")
        for (var item of data.errors) {
          var field = item['field']
          this.errors[field] = item['message'].replace(/_/g," ")
        }
 
      }
      this.hideSpinner();
    })
  }
  getData(): void {
    this.showSpinner();
    this.apiService.getCompanyInfo().subscribe((data) => { 
       console.log("Get profile dump is " + JSON.stringify(data))
        var companyLogoImage = data.company_logo_image
        var imageBase = data.imageBase
        var defaultLogo = "assets/placeholders/company-logo.png"      
        
        if (companyLogoImage) {
          companyLogoImage = `${imageBase}${companyLogoImage}`
        } else {
          companyLogoImage = defaultLogo
        } 
        this.companyForm.patchValue({
          companyName: data.company_name, 
          alternatePhone: data.alternate_phone,
          companyAddress: data.company_address,          
          companyContactFirstName: data.company_contact_first_name,
          companyContactMiddleName: data.company_contact_middle_name,
          companyContactLastName: data.company_contact_last_name
        })
        
         
        this.createdAt = data.created_at 
        this.companyName = data.company_name
        this.companyLogoImageUrl = companyLogoImage                                  
        this.companyAddress = data.company_address
        this.companyLat = data.company_lat
        this.companyLng = data.company_lng 
        this.companyContactFirstName = data.company_contact_first_name
        this.companyContactMiddleName = data.company_contact_middle_name
        this.companyContactLastName = data.company_contact_last_name 
        this.imageBase = data.imageBase

        this.hideSpinner();
     
    }) 
  }
  ngOnInit(): void {
    this.getData()
    let lp = new LocationPicker('map',{
      setCurrentPosition: true, // You can omit this, defaults to true
    }, {
        zoom: 15 // You can set any google map options here, zoom defaults to 15
    });
    /**const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 13,
      mapTypeId: "roadmap"
    });
  

     // Create the search box and link it to the UI element.
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });
  let markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    // Clear out the old markers.
    markers.forEach(marker => {
      marker.setMap(null);
    });
    markers = [];
    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();
    places.forEach(place => {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location
        })
      );

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  }); */
  }

}
