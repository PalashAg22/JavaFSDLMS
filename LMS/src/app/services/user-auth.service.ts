import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private router: Router) { }

  public setRole(role: string) {
    localStorage.setItem("role", role);
  }

  public getRole() {
    return localStorage.getItem("role");
  }

  public setToken(token: string) {
    localStorage.setItem("token", token);
  }

  public getToken(): string {
    return localStorage.getItem("token") ?? '';
  }

  public setTokenExpiresIn(expiresIn: number) {
    const tokenExpirationTime = new Date().getTime() + 1000 * 60 * expiresIn;
    localStorage.setItem("tokenExpiresIn", tokenExpirationTime.toString());
  }

  isTokenExpired(): boolean {
    const tokenExpiration = localStorage.getItem('tokenExpiresIn') ?? 'No Token Available';
    const expirationTime = parseInt(tokenExpiration, 10);
    if (isNaN(expirationTime)) {
      console.error('Invalid token expiration time:', tokenExpiration);
      this.router.navigate(['/home']);
    }
    const currentTime = new Date().getTime();
    return expirationTime < currentTime;
  }
  public clearToken() {
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    const role = this.getRole();
    return token !== null && role !== null;
  }
  public setProfileImage(profileImage: string) {
    let userString: string | null = localStorage.getItem('user');
    if (userString) {
      let user: User = JSON.parse(userString);
      user.profileImage = profileImage;
      localStorage.setItem('user', JSON.stringify(user));
    }
  }
  public setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): any {
    const user = localStorage.getItem('user');
    if (user == null) {
      throw new Error('user not found');
    }
    return JSON.parse(user);
  }

  setProfileImageData(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageDataUrl = reader.result?.toString().split(',')[1];
      let userString: string | null = localStorage.getItem('user');
      if (userString) {
        let user: User = JSON.parse(userString);
        if (imageDataUrl) {
          user.image = imageDataUrl;
          localStorage.setItem('user', JSON.stringify(user));
        }
      };
    }
  }
  }
