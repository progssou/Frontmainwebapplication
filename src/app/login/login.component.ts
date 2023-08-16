import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service'; // Adjust the path accordingly
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginform: FormGroup;
  isLoggedIn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginform = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }




  

  proceedLogin(): void {
    if (this.loginform.valid) {
      const username = this.loginform.value.username;
      const password = this.loginform.value.password;
console.log('username '+this.authService.GetUserbyCode(username));
      this.authService.login(username, password).subscribe(
        (response: any) => {
         
          console.log( response.username + ' Login password:', username); // Log the response.password
          console.log('password :', password); // Log the password
          console.log('tbdlet la3bed Login response:', response.roles); // Log the response
          if (response.username == username) {
            if (response.roles == 'ROLE_ADMIN') {
              sessionStorage.clear();
              sessionStorage.setItem('username',response.username);
              sessionStorage.setItem('role',response.roles);
              this.router.navigate(['/']);
            } else if (response.roles == 'ROLE_MODERATOR') {
              sessionStorage.clear();
              sessionStorage.setItem('username',response.username);
              sessionStorage.setItem('role',response.roles);
              this.router.navigate(['/']);
            }else {
              sessionStorage.clear();
              this.toastr.error('Please contact Admin', 'Note Admin User');
            }
            



          } else {
            console.error('Username is missing in the response.');
          }
        },
        (error) => {
          console.error('Error during login:', error);
          this.toastr.error('An error occurred during login.');
        }
      );
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }
}
