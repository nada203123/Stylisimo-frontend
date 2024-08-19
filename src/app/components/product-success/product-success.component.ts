import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-success.component.html',
  styleUrl: './product-success.component.css'
})
export class ProductSuccessComponent {
  constructor(
    private dialogRef: MatDialogRef<ProductSuccessComponent>,
    private router: Router
  ) {}
  
  onOkClick(): void {
    this.dialogRef.close();
    this.router.navigate([{ outlets: { right: ['products'] } }]);
  }
}
