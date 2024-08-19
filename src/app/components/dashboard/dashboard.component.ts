import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  
  userCount!: number;
  productCount!: number;
  orderCount!: number;

  constructor(private userService: UserService,private productService : ProductService,private orderService:OrderService) { }

  ngOnInit(): void {
    this.userService.getUserCount().subscribe(
      data => {
        this.userCount = data.count;
      },
      error => {
        console.error('Error fetching user count:', error);
      }
    );

    this.productService.getProductCount().subscribe(
      data => {
        this.productCount = data.count;
      },
      error => {
        console.error('Error fetching product count:', error);
      }
    );

    this.orderService.getOrdersCount().subscribe(
      data => {
        this.orderCount = data.count;
      },
      error => {
        console.error('Error fetching product count:', error);
      }
    );
  }

}
