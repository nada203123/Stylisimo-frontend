import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderemailsuccess',
  standalone: true,
  imports: [],
  templateUrl: './orderemailsuccess.component.html',
  styleUrl: './orderemailsuccess.component.css'
})
export class OrderemailsuccessComponent {
  constructor(
    private dialogRef: MatDialogRef<OrderemailsuccessComponent>,
    private router: Router
  ) {} 

  onOkClick(): void {
    this.dialogRef.close();
   
  }
}
