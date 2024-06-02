import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent {
  constructor(private router: Router,private userAuthService: UserAuthService) { }
  navigateLogin() {
    // if(this.userAuthService.getRole()==='ADMIN' && !this.userAuthService.isTokenExpired()){
      if(this.userAuthService.getRole()==='ADMIN'){
      this.router.navigate(['admin/home']);
    // }else if(this.userAuthService.getRole()==='USER' && !this.userAuthService.isTokenExpired()){
    }else if(this.userAuthService.getRole()==='USER'){
      this.router.navigate(['customer/home']);
    // }else if(this.userAuthService.isTokenExpired()){
    //   this.userAuthService.clearToken();
    //   alert("Your session has expired...Please login again.");
    //   this.router.navigate(['/login']);
    }
    else{
      // window.location.reload();
      this.router.navigate(['home']);
    }
    
  }
}
