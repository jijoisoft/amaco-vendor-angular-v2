import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-sign-up-two',
  templateUrl: './sign-up-two.component.html',
  styleUrls: ['./sign-up-two.component.sass']
})

 
export class SignUpTwoComponent implements OnInit {
  signUpTwoForm = new FormGroup({
    firstName: new FormControl(''),
    middleName: new FormControl(''),
    lastName: new FormControl(''),
    alternatePhone: new FormControl(''),
    address: new FormControl('')
  });
  disabled = true
  errors: any = {}
  constructor( private router: Router, private apiService: ApiService) { }

  signUpTwo() {
    var firstName = this.signUpTwoForm.value.firstName
    var middleName = this.signUpTwoForm.value.middleName
    var lastName = this.signUpTwoForm.value.lastName
    var alternatePhone = this.signUpTwoForm.value.alternatePhone
    var address = this.signUpTwoForm.value.address
    this.apiService.signUpTwo(firstName, middleName, lastName, alternatePhone, address).subscribe((data) => {
      if (data.success) {
        
        //Set any local storage variables
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
  validateForm() {

    var optionalFields = ['middleName', 'lastName']
    this.disabled = false
   

    var isValidated = true
    for (var item in this.signUpTwoForm.value) {
      if (optionalFields.indexOf(item) == -1) {
        var value = this.signUpTwoForm.value[item]
        if (!value) {
          this.errors[item] = `${item} is required.`
          isValidated = false
        }
        else
          this.errors[item] = null
      }

    }
    
    if (this.signUpTwoForm.value.name.length < 3 && this.signUpTwoForm.value.name.length > 0) {
      isValidated = false
      this.errors['name'] = "Name Should be atleast 3 characters long"
    }
    
    if (isValidated) {
      var email = this.signUpTwoForm.value.email
      var isEmailValid = this.validateEmail(email)

      if (!isEmailValid) {
        this.errors.email = "Email is invalid"
        isValidated = false
      }
      console.log("Password is " + this.signUpTwoForm.value.password + " and " + this.signUpTwoForm.value.confirm_password)
      if (this.signUpTwoForm.value.password != this.signUpTwoForm.value.confirm_password) {
        this.errors.confirm_password = "Passwords do not match"
        isValidated = false
      }
    }


    this.disabled = !isValidated



  }
 
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  goToSignIn() {
    this.router.navigate(['/signin'])
  }
  goToHome() {
    this.router.navigate(['/home'])
  }
  ngOnInit(): void {
     
  }

}
