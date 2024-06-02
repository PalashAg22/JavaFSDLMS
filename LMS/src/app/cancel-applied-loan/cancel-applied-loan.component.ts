import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-cancel-applied-loan',
  templateUrl: './cancel-applied-loan.component.html',
  styleUrls: ['./cancel-applied-loan.component.css']
})
export class CancelAppliedLoanComponent {
  loanId!:number;
  constructor(private route:ActivatedRoute, private customerService:CustomerService, private router:Router){}
  ngOnInit(){
    this.route.params.subscribe(params=> this.loanId= params['loanId']);
  }
  confirmCancellation(){
    this.customerService.getUpdatedLoanApplication(this.loanId);
    this.router.navigate(['customer/myLoans']);
  }
  goBack(){
    this.router.navigate(['customer/myLoans']);
  }
}
