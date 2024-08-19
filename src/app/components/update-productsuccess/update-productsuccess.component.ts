import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Router } from '@angular/router';

@Component({
  selector: 'app-update-productsuccess',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './update-productsuccess.component.html',
  styleUrl: './update-productsuccess.component.css'
})
export class UpdateProductsuccessComponent {
  constructor(
    private dialogRef: MatDialogRef<UpdateProductsuccessComponent>,
    private router: Router
  ) {}
  
  onOkClick(): void {
    this.dialogRef.close();
    this.router.navigate([{ outlets: { right: ['products'] } }]);
  }

}
