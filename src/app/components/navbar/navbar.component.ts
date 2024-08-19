import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { SubCategoryService } from '../../services/sub-category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

categories: any[] = [];
subCategories: any[] = [];
selectedCategoryId: number | null = null;


  constructor(private categoryService: CategoryService,private subCategoryService: SubCategoryService,private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
    this.route.queryParams.subscribe(params => {
      const categoryId = params['id'];
     
      if (categoryId) {
        this.loadSubCategories(categoryId);
      }
    }); 
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }
  
  loadSubCategories(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.subCategoryService.getSubCategoriesByCategoryId(categoryId).subscribe(
      data => {
        this.subCategories = data;
      },
      error => {
        console.error('Failed to fetch subcategories:', error);
      }
    );
  }

  hideSubCategories(): void {
    this.selectedCategoryId = null; // Reset the selected category ID
    this.subCategories = []; // Clear subcategories on mouse leave
  }
  goToProducts(categoryId: number): void {
    this.router.navigate(['products', categoryId]);
  }

  goToProductsWithSubCategory(categoryId: number, subCategoryId: number): void {
    this.router.navigate(['products', categoryId, subCategoryId]);
    console.log('subcategoryIiiD',subCategoryId)
  }
  goToNavBar() : void {
    this.router.navigate(['signin']);
  }
  goToCart(): void {
    this.router.navigate(['cart']);
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['signin']);
  }
  goToHomePage(){
    this.router.navigate(['shopping']);
  }
  goToFavorites(){
    this.router.navigate(['favorite']);
  }
    
}
