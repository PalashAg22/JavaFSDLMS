import { Component } from '@angular/core';
import { User } from '../Model/User';
import { UserAuthService } from '../services/user-auth.service';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { ProfileImageService } from '../services/profile-image.service';

@Component({
  selector: 'app-account-customer',
  templateUrl: './account-customer.component.html',
  styleUrls: ['./account-customer.component.css']
})
export class AccountCustomerComponent {
  indianStates: string[] = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands',
    'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Lakshadweep', 'Puducherry'
  ];
  customer = new User();
  editMode: boolean = false;
  constructor(private router: Router, private userAuthService: UserAuthService, private customerService: CustomerService, private fileService: ProfileImageService) { }

  ngOnInit() {
    this.loadCustomerDetails();
  }
  loadCustomerDetails() {
    const customer = this.userAuthService.getUser();
    this.customer.address = customer.address;
    this.customer.age = customer.age;
    this.customer.userId = customer.userId;
    this.customer.firstName = customer.firstName;
    this.customer.lastName = customer.lastName;
    this.customer.phoneNumber = customer.phoneNumber;
    this.customer.gender = customer.gender;
    this.customer.email = customer.email;
    this.customer.country = customer.country;
    this.customer.state = customer.state;
    this.customer.city = customer.city;
    this.customer.pinCode = customer.pinCode;
    this.customer.panCardNumber = customer.panCardNumber;
    this.customer.creditScore = customer.creditScore;
    this.customer.dateOfBirth = customer.dateOfBirth;
    this.customer.password = customer.password;
    this.customer.profileImage = customer.profileImage;
    if (this.customer.profileImage) {
      const imageData = customer.image;
      let format = 'jpeg';
      if (this.customer.profileImage.toLowerCase().endsWith('.jpeg')) {
        format = 'jpeg';
      } else if (this.customer.profileImage.toLowerCase().endsWith('.jpg')) {
        format = 'jpg';
      } else if (this.customer.profileImage.toLowerCase().endsWith('.png')) {
        format = 'png';
      }
      this.customer.image = this.getImageUrl(imageData, format);
    }
    console.log(this.customer);
  }
  getImageUrl(base64String: string, format: string): string {
    return `data:image/${format};base64,${base64String}`;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }
  onFileSelected(event: any, fileInput: HTMLInputElement, profileImage: string, userId: number): void {
    const file: File = event.target.files[0];
    if (file.size <= 1048576) {
      this.onUpdateProfile(event, userId);
    } else {
      alert('Image size must be less than 1MB.');
      fileInput.value = '';
    }
  }
  saveChanges() {
    console.log('Saving changes:', this.customer);
    this.toggleEditMode();

    this.customerService.updateAccount(this.customer).subscribe(
      (response) => {
        if (response) {
          this.userAuthService.setUser(this.customer);
          this.router.navigate(['home'])
        } else {
          alert("couldn't save changes");
        }
      },
    );
  }

  onUpdateProfile(event: any, userId: number) {
    const file: File = event.target.files[0];
    console.log("FileName: ", file.name);
    this.userAuthService.setProfileImage(file.name);
    this.userAuthService.setProfileImageData(file);
    this.fileService.updateProfileImage(file, userId).subscribe(
      response => {
        alert('Profile image updated successfully');
        window.location.reload();
        console.log('Profile image updated successfully', JSON.stringify(response))
      },
      error => {
        console.error('Error updating profile image:', error);
        window.location.reload();
        alert('Error updating profile image: ' + error.message);
      }
    );
  }
  onDeleteFile(fileName: string, customerId: number) {
    console.log(fileName);
    this.userAuthService.setProfileImage("null");
    this.fileService.deleteFile(fileName, customerId).subscribe(
      response => {
        alert('Profile Picture removed successfully');
        window.location.reload();
        console.log('Profile image removed successfully', JSON.stringify(response))
      },
      error => {
        alert('Error deleting file:' + error.message);
      }
    );
  }
}
