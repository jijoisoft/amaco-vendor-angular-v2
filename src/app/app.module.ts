console.log()
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReviewsSummaryComponent } from './reviews-summary/reviews-summary.component';
import { ReviewCardComponent } from './review-card/review-card.component';
import { OrderCardComponent } from './order-card/order-card.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpTwoComponent } from './sign-up-two/sign-up-two.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ListingsComponent } from './listings/listings.component';
import { ListingItemComponent } from './listing-item/listing-item.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ServiceListingComponent } from './service-listing/service-listing.component';
import { ServicesComponent } from './services/services.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderCard2Component } from './order-card2/order-card2.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewCard2Component } from './review-card2/review-card2.component'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListingCreate1Component } from './listing-create1/listing-create1.component';
import { FormsModule } from '@angular/forms';
import { StepperComponent } from './stepper/stepper.component';
import { ListingCreate2Component } from './listing-create2/listing-create2.component';
import { ListingCreate3Component } from './listing-create3/listing-create3.component';
import { ListingCreate4Component } from './listing-create4/listing-create4.component';
import { ProfileComponent } from './profile/profile.component';
import { SupportComponent } from './support/support.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { FilterSidebarComponent } from './filter-sidebar/filter-sidebar.component'; 
import { ApiService } from './api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptorService } from './request-interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { OtpVerifyComponent } from './otp-verify/otp-verify.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { TagInputModule } from 'ngx-chips';
import { ProfileEditModalsComponent } from './profile-edit-modals/profile-edit-modals.component'; 
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [ 
    AppComponent,
    HeaderComponent,
    FooterComponent, 
    HomeComponent,
    SidebarComponent,
    ReviewsSummaryComponent,
    ReviewCardComponent,
    OrderCardComponent,
    SignInComponent,
    SignUpComponent,
    SignUpTwoComponent,
    ForgotPasswordComponent,
    ListingsComponent,
    ListingItemComponent,
    PaginationComponent,
    ServiceListingComponent,
    ServicesComponent,
    OrdersComponent,
    OrderCard2Component,
    ReviewsComponent,
    ReviewCard2Component,
    ListingCreate1Component,
    StepperComponent,
    ListingCreate2Component,
    ListingCreate3Component,
    ListingCreate4Component,
    ProfileComponent,
    SupportComponent,
    OrderDetailsComponent,
    ItemCardComponent,
    FilterSidebarComponent,
    OtpVerifyComponent,
    ProfileEditModalsComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    TagInputModule, 
    ToastrModule.forRoot(),
    NgxDropzoneModule
  ],  
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
