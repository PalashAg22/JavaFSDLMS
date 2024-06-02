import { Component } from '@angular/core';
import { UserAuthService } from './services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Final_Project';

  constructor(public userAuthService:UserAuthService,private router:Router){}
  image='';
  bgUser='/assets/image/Loan.jpg';
  role:any=this.userAuthService.getRole();

  ngOnInit() {
    this.logoutIfTokenExpired();
      this.image = this.bgUser;
  }
  logoutIfTokenExpired(): void {
    if (this.userAuthService.isTokenExpired()) {
      this.userAuthService.clearToken();
      alert("Your session has expired...Please login again.");
      this.router.navigate(['/login']);
    }
  }
}
