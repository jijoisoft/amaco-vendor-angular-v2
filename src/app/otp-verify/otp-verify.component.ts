import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidatorFn, AbstractControl } from '@angular/forms'; 

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrls: ['./otp-verify.component.sass']
})
export class OtpVerifyComponent implements OnInit {

  otpForm = new FormGroup({ 
  });
  otp = null;
  otpFieldEnabled = false
  isSubmissionDisabled = true
  otpReceived = null
  otpToken = null
  errorMessage = null
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
  constructor(private router: Router, private apiService: ApiService) { }
    
  checkLoggedIn() {
    var token =  localStorage.getItem("token")
    var isPhoneVerified: any = localStorage.getItem('isPhoneVerified')
    isPhoneVerified = parseInt(isPhoneVerified)
    if(token || (!token && isPhoneVerified)) {
      this.goToHome()
    }
  }
  verifyOTP() {
    var phone = localStorage.getItem('phone')
    if(!phone){
      return this.goToSignIn()
    }
    var otp = this.otp;
    var token = this.otpToken
    this.apiService.verifyOtp(phone,otp,token).subscribe((data) => { 
      console.log("data is ")
      console.log(JSON.stringify(data))
      if (data.success) { 
        this.isSubmissionDisabled = false
        this.otpReceived = data.otp
        this.otpToken = data.token 
        localStorage.setItem('isPhoneVerified',"1")
        localStorage.setItem('token',data.access_token)
        localStorage.setItem('imageBase',data.imageBase)
        for(var item in data.userInfo) {
          var vl = data.userInfo[item]
          vl = vl||""
          localStorage.setItem(item,vl)
        }
        var isForgotPassword: any = localStorage.getItem("forgot_password");
        isForgotPassword = parseInt(isForgotPassword)
        if(!isForgotPassword)
          this.goToHome()
        else 
          this.goToResetPassword()
      }  else {
        this.errorMessage = data.message

      }
    })
    
  }
  goToResetPassword() {
    this.router.navigate(['reset-password'])
  }
  getOTP() {
    var phone = localStorage.getItem('phone')
    if(!phone){
      return this.goToSignIn()
    }
    console.log("Phone is");
    console.log(phone);
    this.apiService.sendOtp(phone).subscribe((data) => {
      console.log("Data is" + JSON.stringify(data));
      if (data.success) { 
        this.isSubmissionDisabled = false
        this.otpReceived = data.otp
        this.otpToken = data.token 
      } 
    })
    
    
    
  }
  goToHome() {
    this.router.navigate(['home'])
  }
  ngOnInit(): void {
    this.checkLoggedIn()
    this.getOTP()
  }
  goToSignIn () {
    this.router.navigate(['sign-in'])
  }
 
  onOtpChange(otp) {
    this.otp = otp
    if(otp.length == 4) {
      this.verifyOTP()
    }
  }

}
