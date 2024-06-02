import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { HomeCustomerComponent } from './home-customer/home-customer.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { AccountCustomerComponent } from './account-customer/account-customer.component';
import { AccountAdminComponent } from './account-admin/account-admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './_auth/auth.guard';
import { AllCustomersComponent } from './all-customers/all-customers.component';
import { CreateLoanTypeComponent } from './create-loan-type/create-loan-type.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { AllLoansComponent } from './all-loans/all-loans.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerLoansComponent } from './customer-loans/customer-loans.component';
import { ApplyLoanComponent } from './apply-loan/apply-loan.component';
import { CalculateEmiComponent } from './calculate-emi/calculate-emi.component';
import { AllAdminsComponent } from './all-admins/all-admins.component';
import { UpdateLoanApplicationComponent } from './update-loan-application/update-loan-application.component';
import { CancelAppliedLoanComponent } from './cancel-applied-loan/cancel-applied-loan.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'login',component: LoginComponent},
  {path:'customer/home',component:HomeCustomerComponent, canActivate: [AuthGuard], data: { role: 'USER' }},
  { path: 'admin/home', component: HomeAdminComponent, canActivate: [AuthGuard], data: { role: 'ADMIN' } },
  {path:'admin/view-all-admin',component:AllAdminsComponent,canActivate: [AuthGuard], data: { role: 'ADMIN'}},
  {path:'home',component: HomeComponent},
  {path:'register',component: CustomerRegisterComponent},
  {path:'customer/myLoans',component: CustomerLoansComponent, canActivate: [AuthGuard], data: { role: 'USER' }},
  {path:'customer/apply-loan/:loanTypeName',component: ApplyLoanComponent, canActivate: [AuthGuard], data: { role: 'USER' }},
  {path:'calculateEMI',component: CalculateEmiComponent},
  {path:'admin/account',component: AccountAdminComponent , canActivate: [AuthGuard], data: { role: 'ADMIN' }},
  {path:'customer/cancel-applied-loan/:loanId',component: CancelAppliedLoanComponent,canActivate: [AuthGuard],data:{role:'USER'}},
  {path:'customer/update-applied-loan/:loanId',component:UpdateLoanApplicationComponent, canActivate: [AuthGuard],data :{role:'USER'}},
  {path:'admin/view-all-customers',component: AllCustomersComponent,canActivate: [AuthGuard], data: { role: 'ADMIN' }},
  {path:'customer/account',component: AccountCustomerComponent, canActivate: [AuthGuard], data: { role: 'USER' }},
  {path:'admin/createLoan',component: CreateLoanTypeComponent,canActivate: [AuthGuard], data: { role: 'ADMIN' }},
  {path:'admin/create-admin',component: CreateAdminComponent,canActivate: [AuthGuard],data: { role: 'ADMIN'}},
  {path:'admin/view-all-loans',component: AllLoansComponent,canActivate: [AuthGuard],data: { role: 'ADMIN'}},
  {path:'admin/view-customer-details/:customerId',component:CustomerDetailsComponent,canActivate: [AuthGuard],data: { role: 'ADMIN'}},
  {path:'forbidden',component: ForbiddenComponent},
  {path:'**',component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
