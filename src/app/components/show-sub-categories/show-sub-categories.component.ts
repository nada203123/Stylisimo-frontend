import { Component, OnInit } from '@angular/core';
import { subCategory } from '../../models/subCategory';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubCategoryService } from '../../services/sub-category.service';
import { MatIconModule } from '@angular/material/icon';
import { AddSubCategoryComponent } from '../add-sub-category/add-sub-category.component';

@Component({
  selector: 'app-show-sub-categories',
  standalone: true,
  imports: [CommonModule,MatIconModule,AddSubCategoryComponent],
  templateUrl: './show-sub-categories.component.html',
  styleUrl: './show-sub-categories.component.css'
})
export class ShowSubCategoriesComponent implements OnInit  {
  subCategories: subCategory[] = [];


  constructor(
    private router: Router,
   private subCategoryService : SubCategoryService
  ) {}


  ngOnInit(): void {
    this.fetchSubCategories();
  }

  fetchSubCategories(): void {
    this.subCategoryService.getSubCategories().subscribe(
      (data) => {
        this.subCategories = data;
      

      },
      (error) => {
        console.error('Error fetching subcategories', error);
      }
    );
  }
  editSubCategory(subCategoryId: number): void {
    this.router.navigate([{ outlets: { right: ['updateSubCategory'] } }], { queryParams: { id: subCategoryId } });
  }

  navigate(route:string) {
    
    this.router.navigate([{ outlets: { right: [route] } }]);
  }
  deleteSubCategory(id: number) {
    this.subCategoryService.deleteSubCategory(id).subscribe(
      () => {
        console.log('subCategory deleted successfully');
        this.subCategories = this.subCategories.filter(subcategory => subcategory.id !== id);
       
      },
      error => {
        console.error('Failed to delete subcategory', error);
        
      }
    );}
    

}


