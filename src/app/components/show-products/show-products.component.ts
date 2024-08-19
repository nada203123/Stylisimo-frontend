import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../models/Product';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { PaginatedProducts } from '../../models/paginatedProducts';
@Component({
  selector: 'app-show-products',
  standalone: true,
  imports: [MatIconModule,CommonModule,MatPaginatorModule],
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit{

  products: Product[] = [];
  totalItems = 0;
  pageSize = 3;
  currentPage = 1;

  
  constructor(
    private router: Router,
   private productService : ProductService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }
  

  fetchProducts(page: number = 1): void {
    this.productService.getProducts(page, this.pageSize).subscribe(
      (data: PaginatedProducts) => {
        //this.products = data;
        //this.products = data.products;
        this.products = data.products.map(product => ({
          ...product,
          sizes: typeof product.sizes === 'string' ? JSON.parse(JSON.stringify(product.sizes)) : product.sizes // Parse sizes if it's a string
      }));
        this.totalItems = data.totalItems;
        this.currentPage = data.currentPage;
        console.log('data ',data.totalItems)
        console.log('fdataProducts',data.products)
        
      

      },
      (error) => {
        console.error('Error fetching subcategories', error);
      }
    );
  }
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchProducts(this.currentPage);
  }
 
  editProduct(productId: number): void {
    this.router.navigate([{ outlets: { right: ['updateProduct'] } }], { queryParams: { id: productId } });
  }

  navigate(route:string) {
    
    this.router.navigate([{ outlets: { right: [route] } }]);
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      () => {
        console.log('subCategory deleted successfully');
        this.products = this.products.filter(product => product.id !== id);
       
      },
      error => {
        console.error('Failed to delete subcategory', error);
        
      }
    );}

   

}
