import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { InformationsComponent } from '../informations/informations.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { SignupSuccessComponent } from '../signup-success/signup-success.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NavbarComponent,InformationsComponent,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  emailExists : boolean = false;

  constructor(private fb: FormBuilder,route: ActivatedRoute, private router: Router, private userService: UserService,private dialog: MatDialog) {}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
goToSignIn(){
  this.router.navigate(['signin']);
}

checkEmail(): void {
  const email = this.signUpForm.get('email')?.value;
  console.log('email',email)
    if (email) {
      this.userService.checkEmail({ email }).subscribe(
        (response: { emailExists: boolean }) => {
          console.log(response)
          if (response) {
            this.signUpForm.get('email')?.setErrors({ emailExists: true });
          }  else {
            this.signUpForm.get('email')?.setErrors(null); 
          }
        },
        error => {
          console.error('Error checking email:', error);
        }
      );
    }
}

  onSubmit() :void{
    if (this.signUpForm.valid && !this.signUpForm.get('email')?.hasError('emailExists')) {
      
  
        console.log('user',this.signUpForm.value)
        const user = this.signUpForm.value as User; 
console.log(user)
       
       
        this.userService.register(user).subscribe(
          response => {
            this.dialog.open(SignupSuccessComponent, {
              data: { email: this.signUpForm.get('email')?.value } // Pass the email from the form
            });
            console.log('registred successfully:', response);
           // this.router.navigate(['/verifyAccount']);
          },
          error => {
            console.error('Failed to register:', error);
          }
        );
      } else {
        console.error('Form is invalid. Please check for errors.');
      }
     
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(SignupSuccessComponent);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
  
}
