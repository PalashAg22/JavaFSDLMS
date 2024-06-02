import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { CreateLoanTypeComponent } from './create-loan-type/create-loan-type.component';
import { HomeComponent } from './home/home.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { HomeCustomerComponent } from './home-customer/home-customer.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RouterModule } from '@angular/router';
import { AccountAdminComponent } from './account-admin/account-admin.component';
import { AccountCustomerComponent } from './account-customer/account-customer.component';
import { AuthGuard } from './_auth/auth.guard';
import { UserService } from './services/user.service';
import { CustomerService } from './services/customer.service';
import { LoanInfoService } from './services/loan-info.service';
import { AllCustomersComponent } from './all-customers/all-customers.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { AllLoansComponent } from './all-loans/all-loans.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerLoansComponent } from './customer-loans/customer-loans.component';
import { ApplyLoanComponent } from './apply-loan/apply-loan.component';
import { CalculateEmiComponent } from './calculate-emi/calculate-emi.component';
import { AllAdminsComponent } from './all-admins/all-admins.component';
import { UpdateLoanApplicationComponent } from './update-loan-application/update-loan-application.component';
import { CancelAppliedLoanComponent } from './cancel-applied-loan/cancel-applied-loan.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    FooterComponent,
    CreateLoanTypeComponent,
    HomeComponent,
    CustomerRegisterComponent,
    HomeCustomerComponent,
    HomeAdminComponent,
    ForbiddenComponent,
    AccountAdminComponent,
    AccountCustomerComponent,
    AllCustomersComponent,
    CreateAdminComponent,
    AllLoansComponent,
    CustomerDetailsComponent,
    CustomerLoansComponent,
    ApplyLoanComponent,
    CalculateEmiComponent,
    AllAdminsComponent,
    UpdateLoanApplicationComponent,
    CancelAppliedLoanComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    UserService,
    CustomerService,
    LoanInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
