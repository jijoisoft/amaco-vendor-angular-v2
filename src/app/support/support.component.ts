import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.sass']
})
export class SupportComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  
  enquiryForm = new FormGroup({
    subject: new FormControl(''), 
    message: new FormControl(''), 
  });
  ngOnInit(): void {
  }
  sendEnquiry(): void {
    var subject = this.enquiryForm.value.subject
    var message = this.enquiryForm.value.message
    this.apiService.sendEnquiry(subject, message).subscribe((data) => {
      if(data.success) {

      }
    });
  } 

}
