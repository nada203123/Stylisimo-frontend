import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-sub-category-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './update-sub-category-success.component.html',
  styleUrl: './update-sub-category-success.component.css'
})
export class UpdateSubCategorySuccessComponent {
  constructor(
    private dialogRef: MatDialogRef<UpdateSubCategorySuccessComponent>,
    private router: Router
  ) {}
  
  onOkClick(): void {
    this.dialogRef.close();
    this.router.navigate([{ outlets: { right: ['subCategories'] } }]);
  }
}
