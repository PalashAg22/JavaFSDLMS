import { Component } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { AdminService } from '../services/admin.service';
import { ProfileImageService } from '../services/profile-image.service';
import { User } from '../Model/User';

@Component({
  selector: 'app-account-admin',
  templateUrl: './account-admin.component.html',
  styleUrls: ['./account-admin.component.css']
})
export class AccountAdminComponent {
  admin: User = new User();
  editMode: boolean = false;

  constructor(private userAuthService: UserAuthService,private adminService: AdminService,private fileService:ProfileImageService) {}
  

  ngOnInit(): void {
    this.loadAdminDetails();
  }

  onFileSelected(event: any, fileInput: HTMLInputElement, profileImage: string, adminId: number): void {
    const file: File = event.target.files[0];
    if (file.size <= 1048576) {
      this.onUpdateProfile(event, profileImage, adminId);
    } else {
      alert('Image size must be less than 1MB.');
      fileInput.value = '';
    }
  }
  
  loadAdminDetails() {
    const admin = this.userAuthService.getUser();
    this.admin.userId = admin.userId;
    this.admin.profileImage = admin.profileImage;
    if (this.admin.profileImage) {
      const imageData= admin.image;
      let format = 'jpeg';
      if (this.admin.profileImage.toLowerCase().endsWith('.jpeg')) {
        format = 'jpeg';
      } else if (this.admin.profileImage.toLowerCase().endsWith('.jpg')) {
        format = 'jpg';
      } else if (this.admin.profileImage.toLowerCase().endsWith('.png')) {
        format = 'png';
      }
      this.admin.image = this.getImageUrl(imageData, format);
    }
    this.admin.firstName = admin.firstName;
    this.admin.lastName = admin.lastName;
    this.admin.email = admin.email;
    this.admin.password = '********';
    this.admin.phoneNumber=admin.phoneNumber;
    this.admin.address=admin.address;
    this.admin.city=admin.city;
    this.admin.pinCode=admin.pinCode;
    this.admin.state=admin.state;
    this.admin.country=admin.country;
    this.admin.gender=admin.gender;
    this.admin.dateOfBirth=admin.dateOfBirth;
}

getImageUrl(base64String: string, format: string): string {
    return `data:image/${format};base64,${base64String}`;
}


  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveChanges() {
    console.log('Saving changes:', this.admin);
    if(this.admin.password.length<8){
      alert("Password must be atleast 8 characters long")
    }
    this.adminService.updateAccount(this.admin).subscribe((status)=>{
      if(status ===true){
        alert("Account updated successfully");
        this.userAuthService.setUser(this.admin);
      }else{
        alert("Account not updated,Something went wrong");
      }
    });
    this.toggleEditMode();
  }
  onUpdateProfile(event: any, fileName: string, adminId: number) {
    const file: File = event.target.files[0];
    console.log("FileName: ", file.name,"For Admin: ",adminId);
    this.userAuthService.setProfileImage(file.name);
    this.userAuthService.setProfileImageData(file);
    this.fileService.updateProfileImage(file, adminId).subscribe(
      response => {
        alert('Profile image updated successfully');
        window.location.reload();
      },
      error => {
        console.error('Error updating profile image:', error);
        alert('Error updating profile image: ' + error.message);
      }
    );
  }
  onDeleteFile(fileName: string, adminId: number) {
    console.log(fileName);
    this.userAuthService.setProfileImage("null");
    window.location.reload();
    this.fileService.deleteFile(fileName, adminId).subscribe(
      response => {
        if (response) {
          alert('Profile Picture removed successfully');
          window.location.reload();
        } else {
          alert('Failed to delete file');
        }
      },
      error => {
        alert('Error deleting file:'+ error.message);
      }
    );
  }


}
