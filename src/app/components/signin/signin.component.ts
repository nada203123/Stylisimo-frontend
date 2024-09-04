import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { InformationsComponent } from '../informations/informations.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { VerifyAccountFailedComponent } from '../verify-account-failed/verify-account-failed.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [NavbarComponent,InformationsComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit{
  signInForm!: FormGroup;
  emailError: string | null = null; // To hold email error message
  passwordError: string | null = null; // To hold password error message
  

  constructor(private fb: FormBuilder,private route: ActivatedRoute, private router: Router,private userService: UserService,private dialog: MatDialog) {}

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
goToSignUp() {
  this.router.navigate(['signup']);
}
goToResetPasswordRequest() {
  this.router.navigate(['resetPasswordRequest']);
}
  onSubmit() {
    if (this.signInForm.valid) {
      console.log('user',this.signInForm.value)
      const user = this.signInForm.value as User; 
      console.log(user)

      this.userService.login(user).subscribe(
        response => {
          this.emailError = null;
          this.passwordError = null;
          const token = response.token;
          const payload = JSON.parse(atob(token.split('.')[1]));
          localStorage.setItem('userId', payload._id);
          localStorage.setItem('role', payload.role);
          console.log('Sign In successfully:', response);
          localStorage.setItem('token', token);

          console.log('role',response.user.role)
          
        if(response.user.role ==='client'){
          this.router.navigate(['/shopping']);
        } else if (response.user.role === 'admin') {
       
          window.location.href = 'http://stylisimo.ddns.net/(right:dashboard)'
          //this.router.navigateByUrl('/dashboard');
        }
        else {
          console.error('Unknown user role:', response.user.role);
        }
         
           
          
        },
        error => {
          if (error.status === 404) { // Adjust based on your API response codes
            this.emailError = 'User not found.';
          } else if (error.status === 401) { // Adjust based on your API response codes
            this.passwordError = 'Invalid password.';
          }else if (error.status === 403) {
            this.dialog.open(VerifyAccountFailedComponent, {
              data: { email: this.signInForm.get('email')?.value } // Pass the email from the form
            });
           
          }else {
            console.error('Failed to Sign In:', error);
          }
        
        }
      );
    } else {
      console.error('Form is invalid. Please check for errors.');
    }
    
  
}
onEmailFocus() {
  this.emailError = null; // Clear email error on focus
}

onPasswordFocus() {
  this.passwordError = null; // Clear password error on focus
}

openDialog(): void {
  const dialogRef = this.dialog.open(VerifyAccountFailedComponent);

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}


}
