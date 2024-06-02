import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanType } from '../Model/LoanType';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.css']
})
export class HomeCustomerComponent implements OnInit{

  tempLoanType: LoanType[] = [];
  searchValue: string = '';
  searchPerformed: boolean = false;

  constructor(private customerService:CustomerService, private router:Router){}
  ngOnInit(): void {
    this.getLoanTypes();
  }
loanTypeList:LoanType[] = [];
  getLoanTypes(){
    this.customerService.getAllLoanTypes().subscribe(
      (loanType)=>{
        this.loanTypeList = loanType
      }
    );
  }

  applyLoan(loanTypeName:string) {
    this.router.navigate(['customer/apply-loan',loanTypeName])
  }

  onSearch() {
    this.searchValue = this.searchValue.trim().toLowerCase();
    if (this.searchValue) {
      this.tempLoanType = this.tempLoanType.filter(loanType =>
        (loanType.loanTypeName.toLowerCase().includes(this.searchValue))
      );
    } else {
      this.tempLoanType = this.loanTypeList;
    }
    this.searchPerformed = true;
  }
}