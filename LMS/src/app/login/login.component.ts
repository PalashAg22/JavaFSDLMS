import { Component } from '@angular/core';
import { Login } from '../Model/Login';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserAuthService } from '../services/user-auth.service';
import { JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userAuthService: UserAuthService, private userService: UserService, private router: Router) {
    this.userAuthService.clearToken();
  }
  doLogin(loginData: Login) {
    this.userService.login(loginData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log("Error : "+error)
        if (error.status >= 401 && error.status<=500) {
          alert("Error : Wrong Credentials");
        } else {
          alert("Error : An error occurred. Please try again later");
        }
        return throwError(error);
      })
    ).subscribe((response: any) => {
      console.log(response);
      this.userAuthService.setToken(response.jwtToken);
      this.userAuthService.setUser(response.user);
        this.userAuthService.setRole(response.user.role);
        this.userAuthService.setTokenExpiresIn(60);
      if (response.user.role==='ADMIN') {
        this.router.navigate(['admin/home']);
      }else if(response.user.role==='USER'){
        this.router.navigate(['customer/home']);
      }
       });
  }
}
