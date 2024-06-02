import { Component } from '@angular/core';
import { LoanType } from '../Model/LoanType';
import { LoanTypeService } from '../services/loan-type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-loans',
  templateUrl: './all-loans.component.html',
  styleUrls: ['./all-loans.component.css']
})
export class AllLoansComponent {
  loanTypes: LoanType[] = [];
  tempLoanTypes: LoanType[] = [];
  searchValue: string='';
  editMode:boolean=false;
  isValid:boolean=false;
  constructor(private loanTypeService: LoanTypeService, private router: Router) { }

  ngOnInit(): void {
    this.getLoanTypes();
  }
  
  onSearch() {
    this.searchValue = this.searchValue.trim().toLowerCase();
    if (this.searchValue) {
      this.tempLoanTypes = this.loanTypes.filter(loanType =>
        loanType.loanTypeName.toLowerCase().includes(this.searchValue)
      );
    } else {
      this.tempLoanTypes = [];
    }
  }

  createNewLoan() {
    this.router.navigate(['admin/createLoan']);
  }

  getLoanTypes() {
    this.loanTypeService.getLoanTypes()
      .subscribe((loanTypes) => {
        this.loanTypes = loanTypes.map(loanType => ({
          ...loanType,
          isEditing: false
        }));
      });
  }

  editLoanType(loanType: LoanType): void {
    loanType.isEditing = true;
    this.editMode=true;
  }

  cancelEdit(loanType:LoanType): void {
    loanType.isEditing = false;
    this.editMode=false;
  } 

  saveLoanType(loanType: LoanType) {
    loanType.isEditing = false;
    this.loanTypeService.updateLoanType(loanType).subscribe(
      (response: LoanType) => {
        console.log(response);
        alert("Loan Type Updated successfully");
        // this.router.navigate(['admin/home'])
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
