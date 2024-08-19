import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { UpdateProductsuccessComponent } from '../update-productsuccess/update-productsuccess.component';
import { MatDialog } from '@angular/material/dialog';
import { PaginatedProducts } from '../../models/paginatedProducts';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {
  UpdateProductForm : FormGroup;
  product: any = {}; 
  errorMessage: string | null = null; 


  constructor(
    private route: ActivatedRoute,
    private router: Router,
   private productService : ProductService,
    private fb: FormBuilder,private dialog: MatDialog
  ) { 
    this.UpdateProductForm = this.fb.group({
      ProductName: ['',Validators.required],
      ProductPrice: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const productId = params['id'];
      console.log('productId',productId)
      if (productId) {
        this.fetchProductDetails(productId);
      }
    }); 
    
  }



  fetchProductDetails(productId: number): void {
   
    this.productService.getProductById(productId).subscribe(
      (product: any) => {
        this.product = product;
        console.log('name',product.name)
        this.UpdateProductForm.patchValue({
          ProductName: product.name,
          ProductPrice : product.price
          
        });
        console.log('Fetched product:', this.product);

       
     
      },
      (error: any) => {
        console.error('Failed to fetch product details:', error);
        
      }
    );
  }


  onSubmit(): void {

    if (this.UpdateProductForm.invalid) {
      // Display general error message if the form is invalid
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }
    const updatedProduct = {
      ...this.product,
      name: this.UpdateProductForm.get('ProductName')?.value,
      price: this.UpdateProductForm.get('ProductPrice')?.value
    };


    


   

    this.productService.updateProduct(updatedProduct).subscribe(
      (updatedProduct: any) => {
        console.log('Product updated successfully:', updatedProduct);
        this.openDialog();
      },
      (error: any) => {
        console.error('Failed to update Product:', error);
        
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UpdateProductsuccessComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  clearErrorMessage() {
    this.UpdateProductForm.get('ProductName')?.markAsUntouched();
    this.UpdateProductForm.get('ProductPrice')?.markAsUntouched();
  }
  clearErrorMessagee() {
    this.errorMessage = null;
  }
   
}
