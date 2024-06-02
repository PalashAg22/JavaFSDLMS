import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private UserAuthService:UserAuthService,private userService: UserService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.UserAuthService.getToken() !== null){
      const role = next.data['role'] as string;
      if(role){
        const match = this.userService.roleMatch(role);
        if(match){
          return true;
        }else{
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
    }
    this.router.navigate(['/login']);
    return false;
  }

}
