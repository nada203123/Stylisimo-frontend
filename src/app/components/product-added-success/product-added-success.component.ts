import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-added-success',
  standalone: true,
  imports: [],
  templateUrl: './product-added-success.component.html',
  styleUrl: './product-added-success.component.css'
})
export class ProductAddedSuccessComponent {

  constructor(
    private dialogRef: MatDialogRef<ProductAddedSuccessComponent>,
    private router: Router
  ) {} 
  onOkClick(): void {
    this.dialogRef.close();
   
  }
}
