import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/Order';
import { OrdersuccessComponent } from '../ordersuccess/ordersuccess.component';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  products: any[] = [];
  userId: number | null = null;

  constructor(private router: Router, private dialogRef: MatDialogRef<OrderComponent>, private fb: FormBuilder,private orderService: OrderService,
    private http: HttpClient, public dialog: MatDialog) {
      this.orderForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        governorate: ['', Validators.required],
        address: ['', Validators.required],
        postalCode: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        userId: [null],
        products: [[]]
      });
    }

    ngOnInit(): void {
      this.loadUserIdFromToken(); 
      this.loadProductsFromLocalStorage();
  
    }

    loadUserIdFromToken(): void {
      const token = localStorage.getItem('token'); // Adjust the key based on how you store your token
      if (token) {
        const decodedToken: any = jwt_decode(token);
        this.userId = decodedToken._id; // Assuming the token contains a `userId` field
        this.orderForm.patchValue({ userId: this.userId });
      }
      console.log(  this.userId)
    }

    loadProductsFromLocalStorage(): void {
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
      const orderProducts = cartItems.map((item: any) => ({
        productId: item.productId,
        size: item.size,
        quantity: item.quantity // Capture the size as well
      }));
      console.log('orderProducts', orderProducts);
      this.orderForm.patchValue({ products: orderProducts });
    }

    onSubmit(): void {
      if (this.orderForm.valid) {
        const orderData = {
          ...this.orderForm.value,
          products: this.orderForm.value.products // This now includes productId and size
        };
    
        console.log('newOrder', orderData);
        this.orderService.addOrder(orderData).subscribe(
          response => {
            console.log('Order created successfully:', response);
            const dialogRef = this.dialog.open(OrdersuccessComponent);
            this.dialogRef.close();
          },
          error => {
            console.error('Error creating order:', error);
            // Handle error (e.g., show an error message)
          }
        );
      }
    }
}
