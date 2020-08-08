import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
import { Router } from  '@angular/router'
import { FormGroup, FormControl } from '@angular/forms'
import { ApiService } from '../api.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-edit-modals',
  templateUrl: './profile-edit-modals.component.html',
  styleUrls: ['./profile-edit-modals.component.sass']
})
export class ProfileEditModalsComponent implements OnInit {
  @ViewChild('profileModalCloseBtn') profileModalCloseBtn: ElementRef<HTMLElement>;
  @ViewChild('passwordModalCloseBtn') passwordModalCloseBtn: ElementRef<HTMLElement>;

  closeProfileModal() {  
    this.profileModalCloseBtn.nativeElement.click() 
  }
  closePasswordModal() {  
    this.passwordModalCloseBtn.nativeElement.click() 
  }
  avatarUrl: any = localStorage.getItem("avatar_image")
  notAvatarUrl = true
  fileToUpload: File = null;
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0); 
    var reader = new FileReader();      
      reader.readAsDataURL(this.fileToUpload ); 
      reader.onload = (_event) => { 
        this.avatarUrl = reader.result; 
        console.log("File url "+this.avatarUrl);
        this.notAvatarUrl = !this.avatarUrl
      }
  }
  errors: any = {}
  name
  email
  phone
  avatarImage
  imageBase
  changePasswordDisabled = true
  //Fields for my orders
 
  orderItemImageBase = ""
  pagination = {}
  orderItems = []

  constructor(private router: Router, private apiService: ApiService,private toaster: ToastrService) { }

  profileForm = new FormGroup({
    editName: new FormControl(''),
    editEmail: new FormControl(''),
    editPhone: new FormControl(''), 
  });
  passwordForm = new FormGroup({
    password: new FormControl(''),
    old_password: new FormControl(''),
    confirm_password: new FormControl('')
  });
  disabled = true //initall when page is loaded button is disabled

  validatePasswordForm() {
    this.changePasswordDisabled = true
    var optionalFields = []
    var isValidated = true

    for (var item in this.passwordForm.value) { 
        var value = this.passwordForm.value[item]
        var label = item 
        this.errors[label] = null;
        if (!value) {
          this.errors[label] = `${label.replace(/_/g, ' ')} is required.`
          isValidated = false
        }
        else
          this.errors[label] = null 
    } 
    var password = this.passwordForm.value.password;
    var confirmPassword = this.passwordForm.value.confirm_password; 
    if(password != confirmPassword) {
      isValidated = false;
      this.errors['confirm_password'] = "Password does not match with confirm password"
    }
    
    this.changePasswordDisabled = !isValidated
  }
  validateForm() {

    var optionalFields = []
    this.disabled = false
    
    var fieldMap = {
      editName: 'name',
      editEmail: 'email',
      editPhone: 'phone'
    };
    console.log("Validatre form is called...");
    var isValidated = true
    for (var item in this.profileForm.value) {
      if (optionalFields.indexOf(item) == -1) { 
        var value = this.profileForm.value[item]
        var label = fieldMap[item] 
        if (!value) {
          this.errors[label] = `${label} is required.`
          isValidated = false
        }
        else
          this.errors[label] = null
      }

    } 

    
    var email = this.profileForm.value.editEmail
    if(email) {
      var isEmailValid = this.validateEmail(email)

      this.errors.email = null
      if (!isEmailValid) {
        this.errors.email = "Email is invalid"
        isValidated = false
      } 

    }

    this.disabled = !isValidated

  }
  checkLoggedIn() {
    var token =  localStorage.getItem("token")
    if(!token) {
      this.goToHome()
    }
  }
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  getProfile() {
    this.apiService.getProfile().subscribe((data)=>{
      this.name = data.name
      this.email = data.email
      this.phone = data.phone
      this.disabled = false;
      
    this.profileForm.setValue({
      editName: this.name,
      editEmail: this.email,
      editPhone: this.phone
    })
      if(data.avatar_image)
        this.avatarImage = data.imageBase+data.avatar_image
      else
        this.avatarImage = "assets/images/avatar.png"
      
    });  
  }
  goToHome() {
    this.router.navigate(['home'])
  }
  changePassword() { 
    var password = this.passwordForm.value.password
    var oldPassword = this.passwordForm.value.old_password  
    var params = {password: password, old_password: oldPassword};  
    this.changePasswordDisabled = true
    this.apiService.editProfile(params).subscribe((data)=> {
      if (data.success) {   
        this.passwordForm.setValue({
          password: null,
          old_password: null,
          confirm_password: null
        })
        this.toaster.success('Password changed', 'Success!');
        this.closePasswordModal();
      }
      else {
        for (var item of data.errors) { 
          var field = item['field']
          this.errors[field] = item['message'].replace(/_/g, ' ')
        }
      }
    })
  }
  editProfile() { 
    var name = this.profileForm.value.editName
    var email = this.profileForm.value.editEmail  
    var phone = this.profileForm.value.editPhone   
    const formData: FormData = new FormData();

    var fileToUpload = this.fileToUpload
    if(fileToUpload)  { 
      formData.append('avatar_image', fileToUpload, fileToUpload.name);
    }
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);

    this.apiService.editProfile(formData).subscribe((data)=> {
      if (data.success) {  
        console.log("Success data is " + JSON.stringify(data))
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.avatarImage = fileToUpload
        var userImage = data.userImageBase + data.avatar_image
        localStorage.setItem('avatar_image' , userImage)
        this.toaster.success('Successfully updated the profile', 'Great!');
        this.closeProfileModal();
      }
      else {
        for (var item of data.errors) { 
          var field = item['field']
          this.errors[field] = item['message']
        }
      }
    })
  }


  ngOnInit(): void {
   // this.checkLoggedIn()
   this.getProfile()
  }

}
