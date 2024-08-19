import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderComponent } from '../order/order.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { LoginFirstComponent } from '../login-first/login-first.component';
import { OutOfStockComponent } from '../out-of-stock/out-of-stock.component';

@Component({
  selector: 'app-cart-items',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.css'
})
export class CartItemsComponent implements OnInit {
  cartItems: any[] = [];
  

  
  constructor(private route: ActivatedRoute, private router: Router,    public dialog: MatDialog,private productService : ProductService) {}
  ngOnInit(): void {
    this.loadCartItems();
    
   
  }

  loadCartItems(): void {
    const items = localStorage.getItem('cart');
    if (items) {
      this.cartItems = JSON.parse(items);
      console.log(this.cartItems)
      this.cartItems.forEach(item => this.fetchProductQuantity(item));
      
    }
    
  }

  fetchProductQuantity(item: any): void {
    this.productService.getProductQuantity(item.productId, item.size)
      .subscribe(
        response => {
          item.quantityInStock = response.quantity  ;
          console.log('Updated Item:', item);
        },
        error => {
          console.error('Error fetching product quantity:', error);
        }
      );
  }




  updateQuantity(item: any): void {
    if (item.quantity < 1) {
      item.quantity = 1; // Minimum quantity is 1
    }
    
    this.saveCart();
  }


  removeFromCart(item: any): void {
    const index = this.cartItems.findIndex(cartItem => cartItem.productId === item.productId && cartItem.size === item.size);
  
  if (index !== -1) {
    // Decrement the quantity
    this.cartItems[index].quantity--;

    // Remove the item if the quantity reaches zero
    if (this.cartItems[index].quantity === 0) {
      this.cartItems.splice(index, 1);
    }
  }
  
  this.saveCart();
  }

  saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  checkout(): void {
    alert('Proceeding to checkout...');
    // Implement checkout logic here
  }

  continueShopping(): void {

    this.router.navigate(['shopping']);
  
  }
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  
  navigate(destination: string) {
    const outOfStockItems = this.cartItems.filter(item => item.quantity > item.quantityInStock);
    console.log('outOfStockItems',outOfStockItems)
    const token = localStorage.getItem('token');
  
  if (destination === 'order' && token && outOfStockItems.length <= 0) {
    const dialogRef = this.dialog.open(OrderComponent);
  } else if (destination === 'order' && !token) {
    const dialogRef = this.dialog.open(LoginFirstComponent);

  }else if (outOfStockItems.length > 0){
    const dialogRef = this.dialog.open(OutOfStockComponent);
  } else {
    this.router.navigate([{ outlets: { right: [destination] } }]);
  }
  }


  getStockStatus(item: any): string {
    return item.quantity > item.quantityInStock ? 'Out of Stock' : 'In Stock';
  }



  
}
