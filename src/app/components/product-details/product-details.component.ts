import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { InformationsComponent } from '../informations/informations.component';
import { Product } from '../../models/Product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductAddedSuccessComponent } from '../product-added-success/product-added-success.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NavbarComponent,InformationsComponent,CommonModule,  FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  selectedSize!: string;
  quantity: number = 1;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    public dialog: MatDialog
  ) {}


  ngOnInit(): void {
    const productIdParam = this.route.snapshot.paramMap.get('productId');
    
    if (productIdParam) {
      const productId = Number(productIdParam); // Safely convert to a number
      this.loadProduct(productId);
    } else {
      console.error('Product ID not found in route parameters.');
    }

  }
  onSizeChange(size: string): void {
    console.log('Selected size:', size);
    this.selectedSize = size;
  }

  loadProduct(productId: number): void {
    this.productService.getProductById(productId).subscribe(
      (data: Product) => {
        this.product = data;
        for (let i in this.product.sizes) {
          this.selectedSize = this.product.sizes[i].size; 
          console.log(this.product.sizes[i].size)
        }
        

      },
      error => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }


  addToCart(): void {
    if (!this.selectedSize) {
      alert('You should select a size.');
      return;
    }
    console.log('selected size',this.selectedSize)
    const cartItem = {
      productId: this.product.id,
      name: this.product.name,
      image:this.product.image,
      price: this.product.price,
      size: this.selectedSize,
      quantity: this.quantity
    };

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    const dialogRef = this.dialog.open(ProductAddedSuccessComponent);
    console.log('Cart item added:', cartItem);
  }
}
