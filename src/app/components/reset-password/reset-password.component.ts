import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { InformationsComponent } from '../informations/informations.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [NavbarComponent,InformationsComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  ResetPasswordPForm: FormGroup;
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
   
    private router: Router
  ) {
    // Initialize the form
    this.ResetPasswordPForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
  }
  onSubmit(): void {
    if (this.ResetPasswordPForm.valid && this.token) {
      const newPassword = this.ResetPasswordPForm.value.password;

  
      this.userService.resetPassword(this.token, newPassword).subscribe(
        response => {
          console.log('Reset Password done');
      
          this.router.navigate(['signin']);
        },
        error => {
         console.error('Error resetting password:', error);
        }
      );
    }
  }
}
