import { Component, OnInit } from '@angular/core';
// import { Admin } from '../Model/admin';
import { AdminService } from '../services/admin.service';
import { User } from '../Model/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-admins',
  templateUrl: './all-admins.component.html',
  styleUrls: ['./all-admins.component.css']
})
export class AllAdminsComponent implements OnInit {
  admins: User[] = [];
  tempAdmins: User[] = [];
  searchValue: string = '';
  searchPerformed: boolean = false;

  constructor(private adminService: AdminService,private router:Router) {}

  ngOnInit(): void {
    this.getAllAdmins();
  }

  getAllAdmins() {
    this.adminService.getAllAdmins().subscribe(admins => {
      console.log(admins);
      this.admins = admins.map(admin => {
        const fullName = `${admin.firstName} ${admin.lastName}`;
        const profileImage = admin.profileImage;
        if (profileImage) {
          const imageData = admin.image;
          let format = 'jpeg';
          if (profileImage.toLowerCase().endsWith('.jpeg')) {
            format = 'jpeg';
          } else if (profileImage.toLowerCase().endsWith('.jpg')) {
            format = 'jpg';
          } else if (profileImage.toLowerCase().endsWith('.png')) {
            format = 'png';
          }
          admin.image = this.getImageUrl(imageData, format);
        }
        return {
          ...admin,
          fullName,
        };
      });
      this.tempAdmins = this.admins;
    });
  }
  getImageUrl(base64String: string, format: string): string {
    return `data:image/${format};base64,${base64String}`;
  }
  onSearch() {
    this.searchValue = this.searchValue.trim().toLowerCase();
    if (this.searchValue) {
      this.tempAdmins = this.admins.filter(admin => {
        if (!isNaN(Number(this.searchValue))) {
          return admin.userId.toString().includes(this.searchValue);
        } else {
          return (
            admin.firstName.toLowerCase().includes(this.searchValue) ||
            admin.lastName.toLowerCase().includes(this.searchValue) ||
            admin.email.toLowerCase().includes(this.searchValue)
          );
        }
      });
    } else {
      this.tempAdmins = this.admins;
    }
    this.searchPerformed = true;
  }

  createNewAdmin() {
    this.router.navigate(['admin/create-admin'])
    }
}
