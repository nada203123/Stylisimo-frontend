import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sub-category-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sub-category-success.component.html',
  styleUrls: ['./sub-category-success.component.css']
})
export class SubCategorySuccessComponent {
  constructor(
    private dialogRef: MatDialogRef<SubCategorySuccessComponent>,
    private router: Router
  ) {}
  
  onOkClick(): void {
    this.dialogRef.close();
    this.router.navigate([{ outlets: { right: ['subCategories'] } }]);
   
  }
}
