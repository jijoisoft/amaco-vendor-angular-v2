import { Component, OnInit, Input } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit { 
  dashboardClass = ""
  equipmentsClass = ""
  manpowerClass = ""
  ordersClass = ""
  reviewsClass = ""
  supportClass = ""
  profileClass = ""
  name
  userFullname
  companyImage
  constructor(private router: Router) { }

  @Input() selected: string;
 
  loadUserInfo(): void {
    var companyImage = "assets/placeholders/avatar.png"
    var temp = localStorage.getItem("company_logo_image")
    if(temp) {
      companyImage = temp;
    }
    this.companyImage = companyImage 
    this.name = localStorage.getItem("name")
  }
  ngOnInit(): void {
    console.log("Selected val is "+this.selected);
    this.dashboardClass = this.selected == "dashboard"?"active":""
    this.equipmentsClass = this.selected == "equipments"?"active":""
    this.manpowerClass = this.selected == "services"?"active":""
    this.ordersClass = this.selected == "orders"?"active":""
    this.reviewsClass = this.selected == "reviews"?"active":""
    this.supportClass = this.selected == "support"?"active":""
    this.profileClass = this.selected == "profile"?"active":""
 
    this.loadUserInfo()

  }
  goToEquipments() {
    this.router.navigate(['equipments'], { queryParams: { is_equipment: 1 } })
  }
  goToServices() {
    this.router.navigate(['services'], { queryParams: { is_service: 1 } })
  }

}
