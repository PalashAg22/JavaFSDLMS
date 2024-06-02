import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
// import { Admin } from '../Model/admin';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {

  adminForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.emailValidator]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  emailValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value && !control.value.endsWith('hexaware.com')) {
      return { invalidEmail: true };
    }
    return null;
  }
  onSubmit() {
    if (this.adminForm.valid) {
      this.adminService.createAdmin(this.adminForm.value).subscribe((data) => {
        alert("Admin Created Successfully");
      }, (error) => {
        alert('Error: Admin already exists' );
      });
    }
  }

}

