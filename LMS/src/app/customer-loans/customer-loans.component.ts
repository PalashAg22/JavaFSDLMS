import { Component } from '@angular/core';
import { LoanApplications } from '../Model/LoanApplications';
import { CustomerService } from '../services/customer.service';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';
import { LoanType } from '../Model/LoanType';
import { LoanTypeService } from '../services/loan-type.service';

@Component({
  selector: 'app-customer-loans',
  templateUrl: './customer-loans.component.html',
  styleUrls: ['./customer-loans.component.css']
})
export class CustomerLoansComponent {
  loanApplication :LoanApplications[] = [];
  tempLoanApplication :LoanApplications[] = [];
  searchValue='';

  loanType: LoanType[] = [];
  loans: LoanApplications[] = [];
  loanStatus = ['APPROVED', 'PENDING', 'REJECTED', 'CANCELLED'];
  selectedStatus = '';
  selectedLoanType = '';
  isFiltering:boolean = false;

  constructor(private customerService:CustomerService, private userAuthservice:UserAuthService,private router:Router){}

  ngOnInit(){
    this.getAllAppliedLoan();
    this.getAllLoanType();
  }
  userId = this.userAuthservice.getUser().userId;
  isEdit = false;
    
  getAllAppliedLoan() {
    this.customerService.getAppliedLoans(this.userId).subscribe(
      response => {
        this.loanApplication = response.map(loan => {
          const interest = (loan.principal * loan.interestRate) / 100;
          const emi = this.calculateEMI(loan.principal, loan.interestRate, loan.tenureInMonths);
          return {
            ...loan,
            loanTypeName: loan.loanType.loanTypeName,
            tenure: loan.tenureInMonths,
            totalInterest: interest,
            emi: emi
          };
        });
        console.log(this.loanApplication);
      }
    );
  }
  
  calculateEMI(principal: number, interestRate: number, tenure: number): number {
    const monthlyInterestRate = (interestRate / 100) / 12;
    const emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenure)) /
                (Math.pow(1 + monthlyInterestRate, tenure) - 1);
    return parseFloat(emi.toFixed(2));
  }
  
  applyFilter() {
    if (this.selectedStatus && this.selectedLoanType) {
      this.tempLoanApplication = this.loanApplication.filter(loan => loan.status === this.selectedStatus && loan.loanTypeName === this.selectedLoanType);
    } else if (this.selectedStatus) {
      this.tempLoanApplication = this.loanApplication.filter(loan => loan.status === this.selectedStatus);
    } else if (this.selectedLoanType) {
      this.tempLoanApplication = this.loanApplication.filter(loan => loan.loanTypeName === this.selectedLoanType);
    } else {
      this.tempLoanApplication = [];
    }
  }

  onSearch() {
    this.searchValue = this.searchValue.trim().toLowerCase();
    if (this.searchValue) {
      this.tempLoanApplication = this.loanApplication.filter(loan =>
        (loan.loanId.toString().toLowerCase().includes(this.searchValue) ||
          loan.loanTypeName.toLowerCase().includes(this.searchValue)
          || loan.status.toLowerCase().includes(this.searchValue))
      );
    } else {
      this.tempLoanApplication =this.loans;
    }
  }

  onFilterStatus(data: string) {
    if(data){
      this.isFiltering=true;
    }
    this.selectedStatus = data;
    this.applyFilter();
  }

  onFilterType(data: string) {
    if(data){
      this.isFiltering=true;
    }
    this.selectedLoanType = data;
    this.applyFilter();
  }

  resetSelectTags() {
    const filterValueSelect = document.querySelector('select[name="filterValue"]') as HTMLSelectElement;
    filterValueSelect.selectedIndex = 0;
    const loanTypeSelect = document.querySelector('select[name="loanType"]') as HTMLSelectElement;
    loanTypeSelect.selectedIndex = 0;
  }

  reset() {
    this.isFiltering=false;
    this.resetSelectTags();
    this.tempLoanApplication = [];
    this.selectedStatus = '';
    this.selectedLoanType = '';
  }
  
  updateLoan(loanId:number){
    console.log(loanId);
    this.router.navigate(['customer/update-applied-loan',loanId])
  }
  cancelLoan(id:number){
    this.router.navigate(['customer/cancel-applied-loan',id])
  }

  getAllLoanType() {
    this.customerService.getAllLoanTypes().subscribe((response) => { this.loanType = response; });
  }
}
