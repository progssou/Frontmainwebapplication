import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr'
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private builder: FormBuilder, private service: AuthService, private router: Router,
    private toastr: ToastrService) {

  }

  registerform = this.builder.group({
    username: this.builder.control('', Validators.required),
    nom: this.builder.control('', Validators.required),
    prenom: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    phoneNumber: this.builder.control('', Validators.required),
    birthDate: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required])),
  
    
  });

  proceedregister() {
    if (this.registerform.valid) {
      const username = this.registerform.value.username;
      const nom = this.registerform.value.nom;
      const prenom = this.registerform.value.prenom;
      const email = this.registerform.value.email;
      const phoneNumberString = this.registerform.value.phoneNumber;
      const birthDateString = this.registerform.value.birthDate; // Use birthDateString instead of birthDate
      const phoneNumber = phoneNumberString && /^\d+$/.test(phoneNumberString) ? parseInt(phoneNumberString, 10) : null;
  
      const password = this.registerform.value.password;
  
      if (username && nom && prenom && email && phoneNumber !== null && password) {
        const birthDate = birthDateString ? new Date(birthDateString) : null; // Convert birthDateString to a Date object
        
        this.service.register(username, nom, prenom, email, phoneNumber, birthDate, password)
          .subscribe(
            result => {
              this.toastr.success('Please contact admin for enable access.', 'Registered successfully');
              this.router.navigate(['/login']);
            },
            error => {
              this.toastr.error('Registration failed. Please try again.');
            }
          );
      } else {
        this.toastr.warning('Please enter valid data.');
      }
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }
  
  
  
  
  
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  
  
  
  
  
  

}
