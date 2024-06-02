import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
// import { Admin } from '../Model/admin';
import { Observable } from 'rxjs';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  constructor(private http:HttpClient,private userAuthService:UserAuthService) { }
  PATH_OF_API:string="http://localhost:8080/api/admin";

  getAuthorizationToken():any{
    let token = this.userAuthService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  public updateAccount(admin:any){
    const url = this.PATH_OF_API+'/update-account';
    return this.http.put(url,admin, {headers:this.getAuthorizationToken()});
  }

  createAdmin(admin:User) {
    const url = this.PATH_OF_API+'/createNewAdmin';
    return this.http.post(url,admin, {headers:this.getAuthorizationToken()});
  }

  getAllAdmins():Observable<User[]>{
    const headers = this.getAuthorizationToken();
    const url=this.PATH_OF_API+'/getAllAdmins';
    return this.http.get<User[]>(url,{headers});
  }

  downloadFile(fileName:string,propertyProofId: number) {
    const headers = this.getAuthorizationToken();
    this.http.get(this.PATH_OF_API+'/property-file/'+propertyProofId, { headers, responseType: 'blob' }).subscribe(
      res =>{
        this.downloadFileHelper(res,fileName);
      }
    );
}
downloadCustomerIdFile(userId:number,idProofName:string){
  const headers = this.getAuthorizationToken();
    this.http.get(`${this.PATH_OF_API}/customerIdProof/${userId}`, { headers, responseType: 'blob' }).subscribe(
      res => {
        this.downloadFileHelper(res,idProofName);
      }
    );
}
downloadFileHelper(res:any,idProofName:string){
  const blob = new Blob([res], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        a.href = url;
        a.download = idProofName;
        a.click();
        window.URL.revokeObjectURL(url);
}

}
