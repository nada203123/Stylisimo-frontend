import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { InformationsComponent } from '../informations/informations.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [NavbarComponent,InformationsComponent,CommonModule],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent implements OnInit {
  favorites: any[] = [];
  product!: Product;
  selectedSize!: string;
  quantity: number = 1;
  products: Product[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadFavorites();
  
  }

  loadFavorites(): void {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      this.favorites = JSON.parse(favorites);
    }
    console.log(favorites)
  }

  goToProduct(productId: number): void {
    this.router.navigate(['product-details', productId]);
    console.log('productID',productId)
  }
}
