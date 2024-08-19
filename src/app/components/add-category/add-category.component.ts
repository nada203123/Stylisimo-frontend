import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../models/Category';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  category: Category = new Category();
  categories: Category[] = [];
  isDuplicateName: boolean = false;
  isCategoryNameEmpty: boolean = false;


  constructor(private categoryService: CategoryService, private router: Router, private dialogRef: MatDialogRef<AddCategoryComponent>) {this.fetchCategories();}
  
  fetchCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      error => {
        console.error('Error fetching categories', error);
      }
    );
  }

  checkDuplicateCategoryName(): void {
    if (!this.category.name) {
      this.isDuplicateName = false; // If category name is empty, no duplicates to check
      return;
    }
  
    this.isDuplicateName = this.categories.some(category => 
      category.name && category.name.toLowerCase() === this.category.name.toLowerCase()
    );
  }

  addCategory(): void {

    this.checkDuplicateCategoryName();
    this.isCategoryNameEmpty = !this.category.name;

    if (this.isCategoryNameEmpty) {
      console.error('Category name is required');
      return;
    }
   
    if (this.isDuplicateName) {
      console.error('Category name already exists');
      return;
    }

    if (this.category.name) {
      this.categoryService.createCategory(this.category).subscribe(
        response => {
          console.log('Category added successfully', response);
          //this.category = new Category(); 
          this.dialogRef.close(response);
        },
        error => {
          console.error('Error adding category', error);
        }
      );
    } else {
      console.error('Category name is required');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
