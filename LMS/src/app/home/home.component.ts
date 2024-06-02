import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoanType } from '../Model/LoanType';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
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

  applyLoan(){
     this.router.navigate(['/login'])
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