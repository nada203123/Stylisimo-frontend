import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword-email',
  standalone: true,
  imports: [],
  templateUrl: './resetpassword-email.component.html',
  styleUrl: './resetpassword-email.component.css'
})
export class ResetpasswordEmailComponent {

  constructor(
    private dialogRef: MatDialogRef<ResetpasswordEmailComponent>,
    private router: Router
  ) {}
  
  onOkClick(): void {
    this.dialogRef.close();
   
  }
}
