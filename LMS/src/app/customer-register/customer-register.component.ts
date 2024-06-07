import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../Model/User';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent {
  registrationForm!: FormGroup;

  customer:User = new User();
  file!:File;

  indianStates: string[] = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands',
    'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Lakshadweep', 'Puducherry'
  ];
  constructor(private userService:UserService,private formBuilder: FormBuilder,private router:Router) {
    this.registrationForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      // , Validators.pattern(/^[^@]+@((?!hexaware\.com).)*$/)
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, this.ageValidator]],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      city:['',[Validators.required,Validators.minLength(3)]],
      pin:['',[Validators.required, Validators.minLength(6),Validators.maxLength(6)]],
      state: ['', Validators.required],
      creditScore: ['', [Validators.required, Validators.min(500)]],
      panCardNumber: ['', [Validators.required, Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
      idProof: ['',Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ageValidator(control: { value: string | number | Date; }) {
    const birthDate = new Date(control.value);
    const age = Math.floor((new Date().getTime() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    return age >= 18 && age <= 80 ? null : { ageInvalid: true };
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.customer.firstName=this.registrationForm.value.FirstName;
      this.customer.lastName=this.registrationForm.value.LastName;
      this.customer.phoneNumber=this.registrationForm.value.phoneNumber;
      this.customer.email=this.registrationForm.value.email;
      this.customer.password=this.registrationForm.value.password;
      this.customer.dateOfBirth=this.registrationForm.value.dateOfBirth;
      this.customer.gender=this.registrationForm.value.gender;
      this.customer.address=this.registrationForm.value.address;
      this.customer.state=this.registrationForm.value.state;
      this.customer.city=this.registrationForm.value.city;
      this.customer.pinCode=this.registrationForm.value.pin;
      this.customer.creditScore=this.registrationForm.value.creditScore;
      this.customer.panCardNumber=this.registrationForm.value.panCardNumber;
      console.log(this.customer);
      this.userService.register(this.customer, this.file).subscribe(response => {
          console.log(response);
          this.router.navigate(['/login']);
          alert('You registeration is successfull,Please login with the credentials to continue.');
      }, (error) => {
        console.log(error);
        alert('Error: '+ error.error );
      });
    } else {
      this.registrationForm.markAllAsTouched();
      console.log(this.registrationForm.value);
      alert("Not filled correctly...")
    }
  }
  onFileUpload(event: any){
    this.file=event.target.files[0];
    console.log(this.file.name);
  }
}