import { Component, OnInit, Optional } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/Order';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderemailsuccessComponent } from '../orderemailsuccess/orderemailsuccess.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule,FormsModule, NgxPaginationModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
  orders: Order[] = [];
  p: number = 1; // Current page
  itemsPerPage: number = 4; // Items per page

  constructor(private orderService: OrderService,@Optional() private dialogRef: MatDialogRef<OrderemailsuccessComponent>,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
        console.log(this.orders);
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      }
    });
  }


  acceptOrder(): void {
    this.orderService.sendOrderConfirmationEmail().subscribe(
      response => {
        console.log('Order confirmation email sent successfully:', response);
        this.dialog.open(OrderemailsuccessComponent);
        this.dialogRef.close();
      },
      error => {
        console.error('Error sending order confirmation email:', error);
      }
    );
    console.log('Accepting order');
  
  }
}
