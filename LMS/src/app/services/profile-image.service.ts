import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileImageService {
  private baseUrl = 'http://localhost:8080/api/file';

  constructor(private http: HttpClient,private userAuthService: UserAuthService) { }

  getAuthorizationHeader(): any {
    let token = this.userAuthService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }
  updateProfileImage(file: File,userId: number): Observable<string>{
    console.log(file);
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<string>(`${this.baseUrl}/updateProfileImage/${userId}`, formData,{headers: this.getAuthorizationHeader()});
  }

  deleteFile(fileName: string, userId: number): Observable<string> {
    console.log("FileName: "+fileName+" UserId: "+userId);
    return this.http.delete<string>(`${this.baseUrl}/delete/${userId}/${fileName}`, { headers: this.getAuthorizationHeader() });
  }   
}
