import { Component, OnInit } from '@angular/core';
import { SubCategoryService } from '../../services/sub-category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { subCategory } from '../../models/subCategory';
import { MatDialog } from '@angular/material/dialog';
import { UpdateSubCategorySuccessComponent } from '../update-sub-category-success/update-sub-category-success.component';

@Component({
  selector: 'app-update-sub-category',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './update-sub-category.component.html',
  styleUrl: './update-sub-category.component.css'
})
export class UpdateSubCategoryComponent implements OnInit {

   UpdateSubCategoryForm!: FormGroup;
   


  subCategory: any ; 
  categories: any[] = []; 
  selectedCategories: string[] = [];

  subCategories: subCategory[] = [];
  isDuplicateName: boolean = false;
  isCategorySelectedAtLeastOne: boolean = true; 
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subCategoryService: SubCategoryService ,
    private categoryService : CategoryService,
    private fb: FormBuilder,private dialog: MatDialog
  ) {this.fetchSubCategories()}

  ngOnInit(): void {
    console.log( this.isDuplicateName)
    this.UpdateSubCategoryForm = this.fb.group({
      SubCategoryName: ['',Validators.required]
    });


    this.route.queryParams.subscribe(params => {
      const subCategoryId = params['id'];
      console.log('subCategoryId',subCategoryId)
      if (subCategoryId) {
        this.fetchSubCategoryDetails(subCategoryId);
      }
    }); 
    this.fetchAllCategories(); 
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
    this.isDuplicateName = this.subCategories
      .filter(subCat => subCat.id !== this.subCategory.id) // Exclude the current subcategory
      .some(subCat => subCat.name.toLowerCase() === this.UpdateSubCategoryForm.get('SubCategoryName')?.value.toLowerCase());
  
    console.log('isDuplicateName', this.isDuplicateName);
  }

  fetchSubCategoryDetails(subCategoryId: number): void {
   
    this.subCategoryService.getSubCategoryById(subCategoryId).subscribe(
      (data => {
        this.subCategory = data;
        this.UpdateSubCategoryForm.patchValue({ SubCategoryName: this.subCategory.name });
        console.log('subCategoryName ',this.subCategory.name )
        this.selectedCategories = this.subCategory.Categories.map((c: { name: string }) => c.name);
        console.log('selectedCategories',this.selectedCategories)
     
      }),
      (error: any) => {
        console.error('Failed to fetch sub-category details:', error);
        
      }
    );
  }

  fetchAllCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories: any[]) => {
        this.categories = categories; // Assign fetched categories to categories array
        this.addCategoryControls();
      },
      (error: any) => {
        console.error('Failed to fetch categories:', error);
        
      }
    );
  }

  addCategoryControls() {
    this.categories.forEach(category => {
      this.UpdateSubCategoryForm.addControl(category.name, new FormControl(this.isCategorySelected(category.name)));
    });
  }

  isCategorySelected(categoryName: string): boolean {
    return this.selectedCategories.includes(categoryName);
  }

 
  onCategoryChange(event: any, categoryName: string) {
    const index = this.selectedCategories.indexOf(categoryName);
    if (event.target.checked) {
      if (index === -1) {
        this.selectedCategories.push(categoryName);
      }
    } else {
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
    this.isCategorySelectedAtLeastOne = this.selectedCategories.length > 0;
  }

  onSubmit() {
    this.UpdateSubCategoryForm.markAllAsTouched();
    this.isCategorySelectedAtLeastOne = this.selectedCategories.length > 0;
    if (this.UpdateSubCategoryForm.invalid || !this.isCategorySelectedAtLeastOne) {
      console.error('Form is invalid');
      return;
    }
  this.checkDuplicateSubCategoryName();
    if (this.isDuplicateName) {
      console.error('SubCategory name already exists');
      return;
    }
    const updatedSubcategory = {
      id: this.subCategory.id,
      name: this.UpdateSubCategoryForm.get('SubCategoryName')?.value,
      categoryNames: this.selectedCategories
    };

 console.log('updatedSubCategory',updatedSubcategory)
    this.subCategoryService.updateSubCategory(updatedSubcategory).subscribe(response => {
      this.openDialog();
      console.log('Subcategory updated successfully:', response);
    }, error => {
      console.error('Error updating subcategory:', error);
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(UpdateSubCategorySuccessComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
