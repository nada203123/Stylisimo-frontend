import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from '../add-category/add-category.component'
import { Category } from '../../models/Category';
import { CategoryService } from '../../services/category.service';


@Component({
  selector: 'app-show-categories',
  standalone: true,
  imports: [CommonModule, MatIconModule,AddCategoryComponent],
  templateUrl: './show-categories.component.html',
  styleUrl: './show-categories.component.css'
})
export class ShowCategoriesComponent implements OnInit  {
  categories: Category[] = [];

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      

      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }
  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(
      () => {
        console.log('Category deleted successfully');
        this.categories = this.categories.filter(category => category.id !== id);
       
      },
      error => {
        console.error('Failed to delete category', error);
        
      }
    );}
    navigate(destination: string) {
      if (destination === 'addCategory') {
        const dialogRef = this.dialog.open(AddCategoryComponent);
  
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.categories.push(result);
          }
        });
      } else {
        this.router.navigate([{ outlets: { right: [destination] } }]);
      }
    }


}
