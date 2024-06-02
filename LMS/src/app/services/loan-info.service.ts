import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoanInfoService {

  constructor(private http:HttpClient,private userAuthService:UserAuthService) { }
  PATH_OF_API:string="http://localhost:8080/api/admin";
  public viewAllAppliedLoans(): Observable<any[]> {
    let token = this.userAuthService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.PATH_OF_API + "/viewAllLoans",{headers});
  }
}
