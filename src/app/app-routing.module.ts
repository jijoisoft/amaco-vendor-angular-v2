import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpTwoComponent } from './sign-up-two/sign-up-two.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ListingsComponent } from './listings/listings.component';
import { ServicesComponent } from './services/services.component'
import { OrdersComponent } from './orders/orders.component'
import { ReviewsComponent } from './reviews/reviews.component'
import { ListingCreate1Component } from './listing-create1/listing-create1.component'
import { ListingCreate2Component } from './listing-create2/listing-create2.component'
import { ListingCreate3Component } from './listing-create3/listing-create3.component'
import { ListingCreate4Component } from './listing-create4/listing-create4.component'
import { OrderDetailsComponent } from './order-details/order-details.component';
import { SupportComponent } from './support/support.component';
import { ProfileComponent } from './profile/profile.component';
import { OtpVerifyComponent } from './otp-verify/otp-verify.component';


const routes: Routes = [
  
  {path:  "", pathMatch:  "full",redirectTo:  "signin"},
  {path: "home", component: HomeComponent},
  {path: "signin", component: SignInComponent},
  {path: "signup", component: SignUpComponent},
  {path: "signup2", component: SignUpTwoComponent},
  {path: "verify-phone", component: OtpVerifyComponent},
  {path: "forgotpassword", component: ForgotPasswordComponent},
  {path: "equipments", component: ListingsComponent},
  {path: "equipments/create", component: ListingCreate1Component},
  {path: "services", component: ListingsComponent },
  {path: "services/create", component: ListingCreate1Component},
  {path: "orders", component: OrdersComponent },
  {path: "order-details", component: OrderDetailsComponent },
  {path: "profile", component: ProfileComponent },
  {path: "support", component: SupportComponent },
  {path: "reviews", component: ReviewsComponent },
  {path: "listings/create", component: ListingCreate1Component },
  {path: "listings/create2", component: ListingCreate2Component },
  {path: "listings/create3", component: ListingCreate3Component },
  {path: "listings/create4", component: ListingCreate4Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  

}
