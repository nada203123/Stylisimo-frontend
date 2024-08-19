import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { InformationsComponent } from '../informations/informations.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-account',
  standalone: true,
  imports: [NavbarComponent,InformationsComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './verify-account.component.html',
  styleUrl: './verify-account.component.css'
})
export class VerifyAccountComponent implements OnInit {
  otpForm: FormGroup;
  otpError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.otpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otpCode: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]]
    });
  }

  ngOnInit(): void {
 
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      if (email) {
        this.otpForm.patchValue({ email }); 
      }
    });
  }


  onSubmit(): void {
    if (this.otpForm.valid) {
      const { email, otpCode } = this.otpForm.value;
      this.otpError = null;
      console.log('otp',otpCode)
    this.userService.verifyAccount(email, otpCode).subscribe(
        response => {
          console.log('OTP verified successfully:', response);
          // Navigate to another page if OTP verification is successful
          this.router.navigate(['signin']);
        },
        error => {
          if (error.status === 400) { // Adjust based on your API response codes
            this.otpError = 'Invalid OTP code. Please try again.';
          } else {
            console.error('Failed to verify OTP:', error);
          }
        }
      );
    } else {
      console.error('Form is invalid. Please check for errors.');
    } 
  }
}
