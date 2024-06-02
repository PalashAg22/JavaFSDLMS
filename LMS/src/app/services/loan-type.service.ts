import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoanType } from '../Model/LoanType';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoanTypeService {
  
  PATH_OF_API:string="http://localhost:8080/api/admin";
  constructor(private http: HttpClient,private userAuthService:UserAuthService) { }

  getAuthorizationToken():any{
    let token = this.userAuthService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }
  
  getLoanTypes(): Observable<LoanType[]> {
    return this.http.get<LoanType[]>(this.PATH_OF_API+'/allLoanTypes',{headers:this.getAuthorizationToken()});
  }
  createNewLoan(loan:LoanType){
    const url = this.PATH_OF_API+'/createLoanType';
    return this.http.post(url,loan, {headers:this.getAuthorizationToken()});
  }

  updateLoanType(loan:LoanType):Observable<LoanType>{
    const headers = this.getAuthorizationToken();
      return this.http.put<LoanType>(this.PATH_OF_API+'/updateLoanType', loan,{headers});      
   }
}
