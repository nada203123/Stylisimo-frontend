import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-success',
  standalone: true,
  imports: [],
  templateUrl: './signup-success.component.html',
  styleUrl: './signup-success.component.css'
})
export class SignupSuccessComponent {
  email: string;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: { email: string },
    private dialogRef: MatDialogRef<SignupSuccessComponent>,
    private router: Router
  ) {this.email = data.email;}
  
  onOkClick(email: String): void {
    this.dialogRef.close();
    this.router.navigate(['/verifyAccount'],{ queryParams: { email } });
  }
}
