import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
//import { LocalService } from '../local.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit {
  checkIcon  = faCheckCircle
  timesIcon = faTimesCircle
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  errors: any = {}
  constructor(private router: Router, private apiService: ApiService) { }
  goToSignUp() {
    this.router.navigate(['signup'])
  }
  checkLoggedIn() {
    var token = localStorage.getItem("token")
    if (token) {
      this.goToHome()
    }
  }
  goToForgotPassword() {
    this.router.navigate(['/forgotpassword'])
  }
  goToHome() {
    this.router.navigate(['/home'])
  }
  login() {
    var email = this.loginForm.value.email
    var password = this.loginForm.value.password
    this.apiService.login(email, password).subscribe((data) => {
      if (data.success) {
        var avatar = data.userInfo.avatar_image
        var imageBase = data.userInfo.imageBase
        var companyImageBase = data.companyImageBase
        var companyImage = data.company_image
        var avatarImage = "assets/images/avatar.png"
        
        if (avatar) {
          avatarImage = `${imageBase}${avatar}`
        }
        if(companyImage) {
          companyImage = `${companyImageBase}${companyImage}`
        }
        var cartCount = data.cart_items_count || 0
        localStorage.setItem("token", data.access_token)
        localStorage.setItem("id", data.id)
        localStorage.setItem("name", data.userInfo.name)
        localStorage.setItem("email", data.userInfo.email)
        localStorage.setItem("is_phone_verified", data.userInfo.is_phone_verified)
        localStorage.setItem("avatar_image", avatarImage)
        localStorage.setItem('company_logo_image', companyImage)
        localStorage.setItem("cart_items_count", cartCount)
        console.log("Local Storate variables" + data.userInfo.name);
        this.goToHome()
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
    this.checkLoggedIn()
  }

}
