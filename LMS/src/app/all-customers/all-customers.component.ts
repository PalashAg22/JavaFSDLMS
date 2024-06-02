import { Component } from '@angular/core';
import { User } from '../Model/User';
import { CustomerService } from '../services/customer.service';
import { NgFor } from '@angular/common';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.css']
})
export class AllCustomersComponent {

  customers: User[] = [];
  tempCustomer: User[] = [];
  searchValue: string = '';
  searchPerformed: boolean = false;

  constructor(private customerService: CustomerService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  onSearch() {
    this.searchValue = this.searchValue.trim().toLowerCase();
    if (this.searchValue) {
      this.tempCustomer = this.customers.filter(customer =>
        (customer.firstName.toLowerCase().includes(this.searchValue) ||
          customer.lastName.toLowerCase().includes(this.searchValue) ||
          customer.email.toLowerCase().includes(this.searchValue) ||
          customer.fullAddress.toLowerCase().includes(this.searchValue))
      );
    } else {
      this.tempCustomer = this.customers;
    }
    this.searchPerformed = true;
  }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe(customers => {
      console.log(customers);
      this.customers = customers.map(customer => {
        const fullName = `${customer.firstName} ${customer.lastName}`;
        const age = this.calculateAge(customer.dateOfBirth);
        const idProofName = `${customer.fileName}`;
        const profileImage = customer.image;
        if (profileImage) {
          const imageData=customer.image;
          let format = 'jpeg';
          if (profileImage.toLowerCase().endsWith('.jpeg')) {
            format = 'jpeg';
          } else if (profileImage.toLowerCase().endsWith('.jpg')) {
            format = 'jpg';
          } else if (profileImage.toLowerCase().endsWith('.png')) {
            format = 'png';
          }
          customer.image = this.getImageUrl(imageData, format);
        }
        const fullAddress = `${customer.address},${customer.city}, ${customer.pinCode}, ${customer.state}, ${customer.country}`;

        return {
          ...customer,
          fullName,
          age,
          idProofName,
          fullAddress
        };
      });
      this.tempCustomer = this.customers;
    });
  }

  getImageUrl(base64String: string, format: string): string {
    return `data:image/${format};base64,${base64String}`;
  }

  calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  downloadCustomerIdFile(userId: number, idProofName: string) {
    this.adminService.downloadCustomerIdFile(userId, idProofName);
  }

}

