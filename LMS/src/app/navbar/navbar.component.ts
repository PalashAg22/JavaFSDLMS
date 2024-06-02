import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router:Router,private userAuthService: UserAuthService,private userService: UserService) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }
  get isLoggedIn():boolean{
    return this.userAuthService.isLoggedIn();
  }

  public userRole(){
    return this.userAuthService.getRole();
  }

  public logout(){
    this.userAuthService.clearToken();
    this.router.navigate(['home']);
  }

  isMenuOpen = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  closeMenu(){
    this.isMenuOpen= !this.isMenuOpen;
  }
}
