import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-first',
  standalone: true,
  imports: [],
  templateUrl: './login-first.component.html',
  styleUrl: './login-first.component.css'
})
export class LoginFirstComponent {
  constructor(
    private dialogRef: MatDialogRef<LoginFirstComponent>,
    private router: Router
  ) {} 
  onOkClick(): void {
    this.dialogRef.close();
   
  }
}
