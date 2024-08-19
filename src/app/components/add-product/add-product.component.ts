import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule ,FormBuilder, FormArray, Validators, FormGroup, FormsModule} from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { SubCategoryService } from '../../services/sub-category.service';
import { ProductService } from '../../services/product.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/Product';
import { ProductSuccessComponent } from '../product-success/product-success.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule,MatIconModule,CommonModule,FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  categories: any[] = [];
  subCategories: any[] = [];  
  errorMessage: string | null = null; 

  

  constructor(private fb: FormBuilder,private productService: ProductService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,private dialog: MatDialog) {this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')]],
      subCategoryId: ['', Validators.required],
      categoryId: ['', Validators.required],
      sizes: this.fb.array([]),
      image:  [null, Validators.required]})}

    ngOnInit(): void {
      this.loadCategories();
      this.loadSubCategories();
    }


    loadCategories() {
      this.categoryService.getCategories().subscribe(data => {
        this.categories = data;
      });
    }
  
    loadSubCategories() {
      this.subCategoryService.getSubCategories().subscribe(data => {
        this.subCategories = data;
      });
    }

    get sizes() {
      return this.productForm.get('sizes') as FormArray;
    }
    
    addSize() {
      this.sizes.push(this.fb.group({
        size: ['', Validators.required],
        quantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
      }));
    }

    removeSize(index: number) {
      this.sizes.removeAt(index);
    }

    onFileChange(event: any) {
      const file = event.target.files[0];
      console.log('file',file)

      if (file) {
        this.productForm.patchValue({
          image: file
        });
      }
    }

    checkProductNameUnique(): Promise<boolean> {
      return new Promise((resolve, reject) => {
        this.productService.isProductNameUnique(this.productForm.get('name')?.value).subscribe(
          (isUnique: boolean) => {
            if (isUnique) {
              this.errorMessage = null;
              resolve(true);
            } else {
              this.errorMessage = 'Product name is already taken. Please choose a different name.';
              resolve(false);
            }
          },
          error => {
            console.error('Error checking product name uniqueness:', error);
            reject(false);
          }
        );
      });
    }

    async onSubmit():Promise<void> {
      
      if (this.productForm.invalid) {
        // Display general error message if the form is invalid
        this.errorMessage = 'Please fill in all required fields correctly.';
        return;
      }

        const isNameUnique = await this.checkProductNameUnique();
      
      if (!isNameUnique) {
        console.error('Product name is not unique. Please choose a different name.');
        return;
      }

        const formData: FormData = new FormData();
    
        // Append form fields to FormData
        formData.append('name', this.productForm.get('name')?.value);
        formData.append('price', this.productForm.get('price')?.value);
        formData.append('categoryId', this.productForm.get('categoryId')?.value);
        formData.append('subCategoryId', this.productForm.get('subCategoryId')?.value);
        formData.append('sizes', JSON.stringify(this.productForm.get('sizes')?.value)); 
    
        // Append the image file to FormData
        const imageFile = this.productForm.get('image')?.value;
        console.log('imageFile',imageFile)
        if (imageFile) {
          formData.append('image', imageFile);
        }
    
        //this.productService.upload
        // Log FormData content for debugging
        formData.forEach((value, key) => {
          console.log(`${key}:::: ${value}`);
        });
        
    
        this.productService.addProduct(formData).subscribe(
          response => {
            console.log('Product added successfully:', response);
            this.openDialog();
          },
          error => {
            console.error('Failed to add product:', error);
          }
        );
      
      }
      openDialog(): void {
        const dialogRef = this.dialog.open(ProductSuccessComponent);
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }

      clearErrorMessage() {
        this.errorMessage = null;
      }

      clearFieldError(fieldName: string) {
        const control = this.productForm.get(fieldName);
        if (control && control.touched && control.invalid) {
          control.setErrors(null);
        }
      }
    
}
