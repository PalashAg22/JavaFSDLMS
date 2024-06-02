import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { LoanType } from '../Model/LoanType';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculate-emi',
  templateUrl: './calculate-emi.component.html',
  styleUrls: ['./calculate-emi.component.css']
})
export class CalculateEmiComponent {
  constructor(private route:ActivatedRoute,private customerService:CustomerService, private router:Router,private formBuilder:FormBuilder){}
  selectedLoan!:LoanType;
  loanInterestRate!:number;
  loanTypes:LoanType[]=[];
  loanForm!:FormGroup;

  ngOnInit(): void {
    this.getLoanTypes();
  }

  updateManagementFees() {
    if (this.selectedLoan !== null && this.selectedLoan !== undefined) {
      const loanType = this.loanTypes.find(type => type.loanTypeName === this.selectedLoan.loanTypeName);
      if (loanType) {
        console.log('Management Fees:', loanType.loanManagementFees);
      }
    } else {
      console.log("No selected LoanType");
    }
  }
  
  

  getLoanTypes(){
    this.customerService.getAllLoanTypes().subscribe(
      (loanType)=>{
        this.loanTypes = loanType
      }
    );
  }

  submitForm(data:any){
    console.log(data.loanAmount+" "+ data.loanDuration+ " " + this.loanInterestRate);
    this.customerService.calculateEMI(data.loanAmount, data.loanDuration,data.loanInterest)
    .subscribe(
      (response)=>{
        alert("Your estimated emi will be: "+ response);
        this.router.navigate(['calculateEMI']);
        console.log(response);
      }
    );
  }
}
