import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordersuccess',
  standalone: true,
  imports: [],
  templateUrl: './ordersuccess.component.html',
  styleUrl: './ordersuccess.component.css'
})
export class OrdersuccessComponent {
  constructor(
    private dialogRef: MatDialogRef<OrdersuccessComponent>,
    private router: Router
  ) {} 
  onOkClick(): void {
    this.dialogRef.close();
    this.router.navigate(['shopping']); 
   
   
  }
}
