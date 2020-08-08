import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl,  } from '@angular/forms';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
  avatarUrl
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

  
 




  signUpForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl('')
  });
  errors: any = {}
  constructor(private router: Router, private apiService: ApiService) {
  }
  goToSignIn() {
    this.router.navigate(['/signin'])
  }
  goToSignUpTwo() {
    this.router.navigate(['/signup2'])
  }
  signUp() {
    console.log("Sign up called...");
    var name = this.signUpForm.value.name
    var email = this.signUpForm.value.email
    var phone = this.signUpForm.value.phone
    var password = this.signUpForm.value.password
    var confirm_password = this.signUpForm.value.confirm_password

    console.log("Email is "+email);
    const formData: FormData = new FormData();
    var fileToUpload = this.fileToUpload
    if(fileToUpload)  { 
      formData.append('avatar_image', fileToUpload, fileToUpload.name);
    }
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('email', email);
    console.log("Calling sign upo api....");
    this.apiService.signUp(formData).subscribe((data) => {
      console.log("API response")
      console.log(JSON.stringify(data))
      if (data.success) {
        
        localStorage.setItem('phone', phone)
        localStorage.setItem('isPhoneVerified', "0")
        this.router.navigate(['signup2'])
      }
      else {
        for (var item of data.errors) {
          console.log("error item is " + JSON.stringify(item))
          var field = item['field']
          this.errors[field] = item['message']
        }


      }
    })
  }

  checkLoggedIn() {
    var token = localStorage.getItem("token")
    if (token) {
      this.goToHome()
    }
  }
  goToHome() {
    this.router.navigate(['home'])
  }
  errorMessage
  checkIfAccountExists() {
    console.log("Inside check if account exists log")
    this.errorMessage = ""
    this.apiService.checkAccountExists(this.signUpForm.value.phone).subscribe((data) => {
      if (!data.success) {
        this.errorMessage = data.message
        this.disabled = true
        this.errors.phone += "Phone number already registered"
      }
      else {
        this.disabled = false
      }
    })

  }
  disabled = true //initall when page is loaded button is disabled
  validateForm() {

    var optionalFields = []
    this.disabled = false
    var name = this.signUpForm.value.name
    var email = this.signUpForm.value.email
    var phone = this.signUpForm.value.phone
    var password = this.signUpForm.value.password
    var confirm_password = this.signUpForm.value.confirm_password

    var isValidated = true
    for (var item in this.signUpForm.value) {
      if (optionalFields.indexOf(item) == -1) {
        var value = this.signUpForm.value[item]
        if (!value) {
          this.errors[item] = `${item} is required.`
          isValidated = false
        }
        else
          this.errors[item] = null
      }

    }
    if (this.signUpForm.value.password.length < 6 && this.signUpForm.value.password.length > 0) {
      isValidated = false
      this.errors['password'] = "Password Should be atleast 6 characters long"
    }
    if (this.signUpForm.value.name.length < 3 && this.signUpForm.value.name.length > 0) {
      isValidated = false
      this.errors['name'] = "Name Should be atleast 3 characters long"
    }

    if (isValidated) {
      var email = this.signUpForm.value.email
      var isEmailValid = this.validateEmail(email)

      if (!isEmailValid) {
        this.errors.email = "Email is invalid"
        isValidated = false
      }
      console.log("Password is " + this.signUpForm.value.password + " and " + this.signUpForm.value.confirm_password)
      if (this.signUpForm.value.password != this.signUpForm.value.confirm_password) {
        this.errors.confirm_password = "Passwords do not match"
        isValidated = false
      }
    }

    if (this.signUpForm.value.phone.length) {
      this.checkIfAccountExists()
    }
    this.disabled = !isValidated



  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  ngOnInit(): void {
  }

}
