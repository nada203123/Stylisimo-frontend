import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product';
import { CommonModule } from '@angular/common';
import { PaginatedProducts } from '../../models/paginatedProducts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productoverview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productoverview.component.html',
  styleUrl: './productoverview.component.css'
})
export class ProductoverviewComponent implements OnInit {

  products: Product[] = [];
  page = 1;
  pageSize = 8;
  favorites: Set<number> = new Set();

  constructor(private productService: ProductService,private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data:  PaginatedProducts) => {
        console.log('Products received:', data);
        this.products = data.products;
        this.syncFavorites();
      },
      (error) => {
        console.error('Failed to fetch products:', error);
      }
    );
  }

  syncFavorites(): void {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    this.products.forEach((product) => {
      product.isFavorite = favorites.some((item: any) => item.productId === product.id);
    });
  }

  
  goToProduct(productId: number): void {
    this.router.navigate(['product-details', productId]);
    console.log('productID',productId)
  }
  toggleFavorite(product: Product): void {
    product.isFavorite = !product.isFavorite; // Toggle favorite state

    // Retrieve favorites from local storage
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (product.isFavorite) {
      // Check if the product is already in favorites
      const isAlreadyFavorited = favorites.some((item: any) => item.productId === product.id);

      if (!isAlreadyFavorited) {
        // If not already favorited, add to favorites array
        favorites.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image 
        });
      }
    } else {
      // If not favorited anymore, remove from favorites array
      favorites = favorites.filter((item: any) => item.productId !== product.id);
    }

    // Update local storage
    localStorage.setItem('favorites', JSON.stringify(favorites));

    console.log('Favorites updated:', favorites);
  }

}
