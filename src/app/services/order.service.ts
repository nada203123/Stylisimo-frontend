import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  addOrder(orderData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8082/api/order/order', orderData);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:8082/api/order/orders');
  }

  getOrdersCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`http://localhost:8082/api/order/ordersCount`);
  }

  sendOrderConfirmationEmail(): Observable<any> {
    return this.http.post(`http://localhost:8082/api/order/send-email`, {});
  }
}
