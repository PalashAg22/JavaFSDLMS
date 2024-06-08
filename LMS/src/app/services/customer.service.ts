import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoanType } from '../Model/LoanType';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';
import { User } from '../Model/User';
import { LoanApplicationRequest } from '../Model/LoanApplicationRequest';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient, private userAuthService: UserAuthService) { }

  baseUrl = 'http://localhost:8080/api';

  getAuthorizationHeader(): any {
    let token = this.userAuthService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  getAllLoanTypesCustomer(): Observable<LoanType[]> {
    const endpoint = this.baseUrl + '/customer/dashboard';
    return this.http.get<LoanType[]>(endpoint, { headers:this.getAuthorizationHeader() });
  }
  getAllLoanTypes(): Observable<LoanType[]> {
    const endpoint = this.baseUrl + '/dashboard';
    return this.http.get<LoanType[]>(endpoint);
  }
  
  getCustomerById(customerId: number): Observable<any> {
    const endpoint = this.baseUrl + `/admin/viewCustomerDetails/${customerId}`;
    return this.http.get<any>(endpoint, { headers:this.getAuthorizationHeader() });
  }

  getAppliedLoans(customerId: number): Observable<any[]> {
    const headers = this.getAuthorizationHeader();
    return this.http.get<any[]>(this.baseUrl + '/customer/viewAllAppliedLoans/' + customerId, { headers });
  }

  getAllCustomers(): Observable<any[]> {
    const endpoint = this.baseUrl + '/admin/viewAllCustomers';
    return this.http.get<any[]>(endpoint, { headers:this.getAuthorizationHeader() });
  }

  applyForLoan(loanApplicationRequest: LoanApplicationRequest, file: File): Observable<boolean> {
    let formData = new FormData();
    console.log(loanApplicationRequest);
    console.log(file);
    formData.append('loanRequest', JSON.stringify(loanApplicationRequest));
    formData.append('file', file);
    return this.http.post<boolean>(this.baseUrl + '/customer/loan-application/applyLoan', formData, {headers: this.getAuthorizationHeader()});
  }

  calculateEMI(data1:any,data2:any,data3:any){
    const url = `${this.baseUrl}/checkEMI/${data1}/${data3}/${data2}`;
    const headers=this.getAuthorizationHeader();
    return this.http.get(url,{headers});
  }

  updateAccount(customer: User): Observable<User> {
    const headers = this.getAuthorizationHeader();
    const url = this.baseUrl + '/customer/updateAccount';
    return this.http.put<User>(url, customer, { headers });
  }  
  updateAppliedLoan(loanApplicationRequest: LoanApplicationRequest, file: File):Observable<any> {
    let formData = new FormData();
    console.log("Received: "+loanApplicationRequest+" & "+file);
    console.log("Inside UpdateAppliedLoan() in Service");
    
    formData.append('loanRequest', JSON.stringify(loanApplicationRequest));
    formData.append('file', file);
    return this.http.post<boolean>(this.baseUrl + '/customer/update-loan', formData, {headers: this.getAuthorizationHeader()});
  }
  getUpdatedLoanApplication(loanId:number):Observable<any>{
    console.log(" "+loanId);
    return this.http.get<boolean>(this.baseUrl+'/customer/cancel-applied-loan/'+ loanId,{headers:this.getAuthorizationHeader()});
  }

}