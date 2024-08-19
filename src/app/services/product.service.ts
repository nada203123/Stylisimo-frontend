import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { map, Observable } from 'rxjs';
import { PaginatedProducts } from '../models/paginatedProducts';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts (page: number = 1, size: number = 10) : Observable<PaginatedProducts> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size);

    return this.http.get< PaginatedProducts >('http://localhost:4000/product/products', { params });
  }

  addProduct(product: FormData) : Observable<any> {
    return this.http.post('http://localhost:4000/product/addProduct', product);
   }

  deleteProduct(id: number): Observable<any> {
   return this.http.delete(`http://localhost:4000/product/deleteProduct/${id}`)   
  }

  updateProduct(product: any): Observable<any> {
    const url = `http://localhost:4000/product/updateProduct/${product.id}`; 
    return this.http.put(url, product);
  }

  getProductById(id: number): Observable<Product> {
    const url = `http://localhost:4000/product/product/${id}`;
    return this.http.get<Product>(url);
  }


  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:4000/product/productsCategory/${categoryId}`);
  }

  getProductsByCategoryAndSubCategory(categoryId: number, subCategoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:4000/product/category/${categoryId}/subCategory/${subCategoryId}/products`);
  }
  getProductCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`http://localhost:4000/product/countProducts`);
  }

  isProductNameUnique(name: string): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:4000/product/check`, { params: { name } });
  }

  getProductQuantity(productId: number, size: string): Observable<{ quantity: number }> {
    return this.http.get<{ quantity: number }>(`http://localhost:4000/product/productsQuantity/${productId}?size=${size}`);
  }
  
}
