import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { InformationsComponent } from '../informations/informations.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import { MatDialog } from '@angular/material/dialog';
import { ResetpasswordEmailComponent } from '../resetpassword-email/resetpassword-email.component';


@Component({
  selector: 'app-reset-password-request',
  standalone: true,
  imports: [NavbarComponent,InformationsComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './reset-password-request.component.html',
  styleUrl: './reset-password-request.component.css'
})
export class ResetPasswordRequestComponent implements OnInit{
  ResetPasswordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.ResetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.ResetPasswordForm.valid) {
      const user = this.ResetPasswordForm.value as User; 

      this.userService. resetPasswordRequest(user).subscribe(
        response => {
          console.log('Password reset request successful:', response);
       
       this.dialog.open(ResetpasswordEmailComponent)
        },
        error => {
          console.error('Failed to request password reset:', error);
        }
      );
    } else {
      console.error('Form is invalid. Please check for errors.');
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ResetpasswordEmailComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
