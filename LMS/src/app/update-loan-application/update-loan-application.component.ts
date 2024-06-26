import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Model/User';
import { LoanApplicationRequest } from '../Model/LoanApplicationRequest';
import { LoanType } from '../Model/LoanType';
import { CustomerService } from '../services/customer.service';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-update-loan-application',
  templateUrl: './update-loan-application.component.html',
  styleUrls: ['./update-loan-application.component.css']
})
export class UpdateLoanApplicationComponent {

  constructor(private router:Router, private customerService:CustomerService ,private route:ActivatedRoute,private userAuthService:UserAuthService){}
  loanId!:number;
  loanApplicationRequest = new LoanApplicationRequest();
  file!:File;
  isValid:boolean = false;
  customer:User = this.userAuthService.getUser();
  loanType:LoanType [] = [];


  ngOnInit(){
    this.route.params.subscribe(params => this.loanId=params['loanId'])
    this.customerService.getAllLoanTypesCustomer().subscribe(
      (response)=>{
        this.loanType = response;
      }
    )
    console.log(this.loanId);
  }
  onFileUpload(data:any){
    this.file =data.target.files[0];
    console.log(this.file);
    if(this.file && this.file.size > 1048576){
      this.isValid = false;
      alert('File size exceeds 1MB. Please upload a smaller file.');
      data.target.value = '';   
    }else{
      this.isValid = true;
    }
  }
  getData(data:any){
    console.log("Update LoanApplication: "+data);
    this.loanApplicationRequest.loanId = this.loanId;
    this.loanApplicationRequest.customerId = this.customer.userId;
     this.loanApplicationRequest.loanTypeName = data.loanType;
     this.loanApplicationRequest.principal = data.principal;
     this.loanApplicationRequest.propertyAddress = data.propertyAddress;
     this.loanApplicationRequest.propertyAreaInm2 = data.propertyAreaInm2;
     this.loanApplicationRequest.propertyValue = data.propertyValue;
     this.loanApplicationRequest.tenureInMonths = data.tenureInMonths;
     console.log(this.loanApplicationRequest); 
    this.customerService.updateAppliedLoan(this.loanApplicationRequest,this.file).subscribe(
      (Respose)=>{
        alert("Successfully updated loan application");
        this.router.navigate(['customer/myLoans']);
      },
      (error) => {
        console.log(error)
        if (error.status === 400) {
          alert('Error: ' + error.error);
        } else{
          alert("Something went wrong. Please try again later.");
        }
        this.router.navigate(['customer/myLoans']);
      }
    );
  }
    
}
