import { Component, OnInit } from '@angular/core';
import { LoanApplications } from '../Model/LoanApplications';
import { LoanInfoService } from '../services/loan-info.service';
import { LoanService } from '../services/loan.service';
import { LoanType } from '../Model/LoanType';
import { LoanTypeService } from '../services/loan-type.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  loanStatus = ['APPROVED', 'PENDING', 'REJECTED', 'CANCELLED'];
  loanType: LoanType[] = [];
  loans: LoanApplications[] = [];
  tempLoanApplication: LoanApplications[] = [];
  customerId!: number;
  selectedStatus = '';
  selectedLoanType = '';
  searchValue = '';
  isFiltering:boolean = false;

  constructor(
    private loanInfoService: LoanInfoService,
    private userService: LoanService,
    private loanTypeService: LoanTypeService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.getAppliedLoans();
    this.getAllLoanType();
  }

  onActionChange(event: Event, loanId: number) {
    const target = event.target as HTMLSelectElement;
    const newStatus = target.value;
    this.userService.updateLoanStatus(loanId, newStatus).subscribe(
      () => {
        const loanToUpdate = this.loans.find(loan => loan.loanId === loanId);
        if (loanToUpdate) {
          loanToUpdate.status = newStatus;
        }
        alert('Loan status updated successfully');
      },
      (error) => {
        console.error('Error updating loan status:', error);
      }
    );
  }

  getAllLoanType() {
    this.loanTypeService.getLoanTypes().subscribe((response) => { this.loanType = response; });
  }

  getAppliedLoans() {
    this.loanInfoService.viewAllAppliedLoans().subscribe((data) => {
      this.loans = data.map((item) => {
        const loanTypeName = item.loanType.loanTypeName;
        const propertyAddress = item.propertyInfo.propertyAddress;
        const customer = `${item.user.firstName} ${item.user.lastName}`;
        const loanApplications = new LoanApplications();
        loanApplications.loanId = item.loanId;
        loanApplications.principal = item.principal;
        loanApplications.loanApplyDate = item.loanApplyDate;
        loanApplications.loanTypeName = loanTypeName;
        loanApplications.propertyAddress = propertyAddress;
        loanApplications.status = item.status;
        loanApplications.tenure = item.tenureInMonths;
        loanApplications.customerName = customer;
        loanApplications.propertyProofId=item.propertyInfo.propertyProof.propertyProofId;
        loanApplications.propertyFile = item.propertyInfo.propertyProof.name;
        loanApplications.customerId = item.user.userId;
        return loanApplications;
      });
    });
  }
  
  applyFilter() {
    if (this.selectedStatus && this.selectedLoanType) {
      this.tempLoanApplication = this.loans.filter(loan => loan.status === this.selectedStatus && loan.loanTypeName === this.selectedLoanType);
    } else if (this.selectedStatus) {
      this.tempLoanApplication = this.loans.filter(loan => loan.status === this.selectedStatus);
    } else if (this.selectedLoanType) {
      this.tempLoanApplication = this.loans.filter(loan => loan.loanTypeName === this.selectedLoanType);
    } else {
      this.tempLoanApplication = [];
    }
  }

  onSearch() {
    this.searchValue = this.searchValue.trim().toLowerCase();
    if (this.searchValue) {
      this.tempLoanApplication = this.loans.filter(loan =>
        (loan.customerId.toString().toLowerCase().includes(this.searchValue) ||
          loan.loanId.toString().toLowerCase().includes(this.searchValue) ||
          loan.customerName.toLowerCase().includes(this.searchValue) || loan.loanTypeName.toLowerCase().includes(this.searchValue)
          || loan.propertyAddress.toLowerCase().includes(this.searchValue) || loan.status.toLowerCase().includes(this.searchValue))
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

  downloadFile(propertyProofId: number,propertyFile:string) {
    this.adminService.downloadFile(propertyFile,propertyProofId);
  }

}