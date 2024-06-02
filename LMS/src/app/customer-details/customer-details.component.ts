import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../Model/User';
import { CustomerService } from '../services/customer.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent {
  customer: User = new User();

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const customerId = +params['customerId'];
      this.loadCustomer(customerId);
    });
  }

  loadCustomer(customerId: number): void {
    this.customerService.getCustomerById(customerId)
      .subscribe((customer) => {
        this.customer.userId=customer.userId;
        this.customer.phoneNumber = customer.phoneNumber;
        this.customer.creditScore=customer.creditScore;
        this.customer.email=customer.email;
        this.customer.dateOfBirth=customer.dateOfBirth;
        this.customer.gender=customer.gender;
        this.customer.panCardNumber=customer.panCardNumber;
        this.customer.idProofName=customer.fileName;
        this.customer.fullName = `${customer.firstName} ${customer.lastName}`;
        this.customer.age = this.calculateAge(customer.dateOfBirth);
        this.customer.fullAddress = `${customer.address}, ${customer.city}, ${customer.pinCode}, ${customer.state}, ${customer.country}`;
        
      });
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

  downloadCustomerIdFile(userId:number,idProofName:string){
    this.adminService.downloadCustomerIdFile(userId,idProofName);
  }
}
