import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-out-of-stock',
  standalone: true,
  imports: [],
  templateUrl: './out-of-stock.component.html',
  styleUrl: './out-of-stock.component.css'
})
export class OutOfStockComponent {
  constructor(
    private dialogRef: MatDialogRef<OutOfStockComponent>,
    private router: Router
  ) {} 
  onOkClick(): void {
    this.dialogRef.close();
   
  }
}
