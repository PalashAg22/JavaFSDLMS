import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Model/User';
import { CustomerService } from '../services/customer.service';
import { LoanApplicationRequest } from '../Model/LoanApplicationRequest';
import { LoanType } from '../Model/LoanType';
// import { LoanTypeService } from '../services/loan-type.service';

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrls: ['./apply-loan.component.css']
})
export class ApplyLoanComponent implements OnInit {


  loanApplicationRequest = new LoanApplicationRequest();
  file!: File;
  customer: User = this.userAuthService.getUser();
  loanType: LoanType[] = [];
  selectedLoanTypeName = '';

  constructor(private userAuthService: UserAuthService, private router: Router, private customerService: CustomerService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => this.selectedLoanTypeName = params['loanTypeName']);
    this.customerService.getAllLoanTypesCustomer().subscribe(
      (response) => {
        this.loanType = response;
      }
    )
  }

  onFileUpload(data: any) {
    this.file = data.target.files[0];
    console.log(this.file);
  }

  getData(data: any) {
    console.log(data);
    this.loanApplicationRequest.customerId = this.customer.userId;
    this.loanApplicationRequest.loanTypeName = data.loanType;
    this.loanApplicationRequest.principal = data.principal;
    this.loanApplicationRequest.propertyAddress = data.propertyAddress;
    this.loanApplicationRequest.propertyAreaInm2 = data.propertyAreaInm2;
    this.loanApplicationRequest.propertyValue = data.propertyValue;
    this.loanApplicationRequest.tenureInMonths = data.tenureInMonths;
    console.log(this.loanApplicationRequest);

    this.customerService.applyForLoan(this.loanApplicationRequest, this.file).subscribe(
      (response) => {
        alert('Submitted successfully');
        this.router.navigate(['customer/myLoans']);
      },
      (error) => {
        if (error.status === 400 && error.error.includes('PropertyAlreadyExistException')) {
          alert('Error: ' + error.message);
        } else if (error.status === 403 && error.error.includes('CustomerNotEligibleException')) {
          alert('Error: ' + error.message);
        } else {
          alert('Error: ' + error.message);
        }
      }
    );
    

  }

  invalidData() {
    return;
  }
}