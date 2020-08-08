import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
}) 




export class HeaderComponent implements OnInit {

  dropdownIcon = faAngleDown

  name
  avatar_image
  token = localStorage.getItem('token')
  loadData() {
    this.name =  localStorage.getItem('name')
    var avatarImage = localStorage.getItem('avatar_image')
    avatarImage= avatarImage?avatarImage:"assets/placeholders/avatar.png"
    this.avatar_image =  avatarImage
    console.log("Avatar image is " + JSON.stringify(this.avatar_image) )
  }
  goToHome() {
    this.router.navigate(['home'])
  }
  goToEquipments() {
    this.router.navigate(['equipments'])
  }
  goToServices() {
    this.router.navigate(['services'])
  }
  goToContact() {
    this.router.navigate(['contact'])
  }
  logout() {
    localStorage.clear()
    this.token = null
    this.router.navigate(['signin'])
  }
  constructor(private router: Router) { }

  ngOnInit(): void {
     this.loadData()
  }

}
