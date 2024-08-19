import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../models/Category';
import { SubCategoryService } from '../../services/sub-category.service';
import { catchError, Observable, throwError } from 'rxjs';
import { subCategory } from '../../models/subCategory';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog,MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { SubCategorySuccessComponent } from '../sub-category-success/sub-category-success.component';

@Component({
  selector: 'app-add-sub-category',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, MatDialogModule,SubCategorySuccessComponent],
  templateUrl: './add-sub-category.component.html',
  styleUrl: './add-sub-category.component.css'
})
export class AddSubCategoryComponent implements OnInit {
  subCategory: subCategory = new subCategory(); 
  categories: Category[] = [];
  subCategories: subCategory[] = [];
  isDuplicateName: boolean = false;
  isNameEmpty: boolean = false;
  isCategoryEmpty: boolean = false;
  


  constructor(private subCategoryService: SubCategoryService, private categoryService: CategoryService,private router: Router,
    private dialog: MatDialog) {this.fetchSubCategories()}

  ngOnInit(): void {
    console.log(this.subCategory.name)
    this.fetchCategories();
  }

  fetchSubCategories(): void {
    this.subCategoryService.getSubCategories().subscribe(
      (data: subCategory[]) => {
        this.subCategories = data;
      },
      error => {
        console.error('Error fetching categories', error);
      }
    );
  } 

  checkDuplicateSubCategoryName(): void {
    if (this.subCategory.name) {
      this.isDuplicateName = this.subCategories.some(subCategory => 
        subCategory.name && subCategory.name.toLowerCase() === this.subCategory.name.toLowerCase()
      );
    } else {
      this.isDuplicateName = false;  // If name is undefined, it can't be a duplicate
    }
  }




  fetchCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
        console.log(this.categories)
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  toggleCategorySelection(categoryName: string): void {
    const index = this.subCategory.categoryNames.indexOf(categoryName);
    console.log("index")
    if (index === -1) {
      // Add category if not already selected
      this.subCategory.categoryNames.push(categoryName);
    } else {
      // Remove category if already selected
      this.subCategory.categoryNames.splice(index, 1);
    }
    console.log('Selected Categories:', this.subCategory.categoryNames); // Optional: log to verify
  }
  validateForm(): boolean {
    // Check if subCategory.name exists and is not an empty string after trimming
    if (!this.subCategory.name || this.subCategory.name.trim() === '') {
      this.isNameEmpty = true;
      return false;
    }
  
    if (this.subCategory.categoryNames.length === 0) {
      this.isCategoryEmpty = true;
      return false;
    }
    // Reset isNameEmpty flag if name is valid
    this.isNameEmpty = false;
    this.isCategoryEmpty = false;
    return true;
  }
  

  onSubmit() {
    
    if (!this.validateForm()) {
      console.error('Form validation failed');
      return;
    }

    this.checkDuplicateSubCategoryName();

    if (this.isDuplicateName) {
      console.error('SubCategory name already exists');
      return;
    }
    // Process form submission
    this.subCategoryService.addSubCategory(this.subCategory).subscribe(
      response => {
        console.log('Subcategory added successfully', response);
         this.openDialog();
      },
      error => {
        console.error('Failed to add subcategory', error);
      }
    );
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(SubCategorySuccessComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  clearNameError() {
    this.isNameEmpty = false;
    this.isDuplicateName = false; // Clear duplicate name error as well
  }
  
  clearCategoryError() {
    this.isCategoryEmpty = false;
  }
}


