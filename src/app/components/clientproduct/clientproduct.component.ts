import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { InformationsComponent } from '../informations/informations.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-clientproduct',
  standalone: true,
  imports: [NavbarComponent,InformationsComponent,CommonModule],
  templateUrl: './clientproduct.component.html',
  styleUrl: './clientproduct.component.css'
})
export class ClientproductComponent implements OnInit {

  products: Product[] = [];
  categoryId: number = 0;
  subCategoryId: number | null = null;
  favorites: Set<number> = new Set();

  constructor(private route: ActivatedRoute, private productService: ProductService,private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = +params['categoryId']; // Use '+' to convert to number
      this.subCategoryId = params['subCategoryId'] ? +params['subCategoryId'] : null;
      console.log( 'caaaategoryId',this.categoryId);
      console.log('subCategoryIdOninit', this.subCategoryId);
      this.loadProducts();
    });
  }

  
  loadProducts(): void {
    if (this.subCategoryId) {
      console.log('subCategoryIdload', this.subCategoryId);
      console.log('categoryIdload', this.categoryId);
      this.productService.getProductsByCategoryAndSubCategory(this.categoryId, this.subCategoryId).subscribe(
        (data: Product[]) => {
          
          this.products = data;
          this.syncFavorites();
          console.log(data)
        },
        error => {
          console.error('Error fetching products:', error);
        }
      );
    } else {
    
    this.productService.getProductsByCategory(this.categoryId).subscribe(
      
     ( data : Product[]) => {
        this.products = data;
        this.syncFavorites();
        console.log('data from category',data)
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }
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

    console.log('Favorites updated:', favorites);}
}
