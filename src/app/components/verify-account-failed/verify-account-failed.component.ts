import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-account-failed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verify-account-failed.component.html',
  styleUrl: './verify-account-failed.component.css'
})
export class VerifyAccountFailedComponent {
  email: string;

  
  constructor(@Inject(MAT_DIALOG_DATA) public data: { email: string },
    private dialogRef: MatDialogRef<VerifyAccountFailedComponent>,
    private router: Router
  ) {this.email = data.email;}


  onOkClick(email: String): void {
    this.dialogRef.close();
    this.router.navigate(['/verifyAccount'],{ queryParams: { email } });
  }
}
