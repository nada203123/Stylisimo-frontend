import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { RouterOutlet } from '@angular/router';
import { Category } from '../../models/Category';
import { LeftLayoutComponent } from '../left-layout/left-layout.component';
import { RightlayoutComponent } from '../rightlayout/rightlayout.component';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,LeftLayoutComponent,RightlayoutComponent,AddCategoryComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 
  
 
 
  isDropdownOpen = false; 

  constructor(private router: Router) { }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen; // Toggle dropdown visibility
  }

  logout(): void {
    
    localStorage.removeItem('token');
    window.location.href = 'http://stylisimo.ddns.net:8084/signin'; // Redirect to the login page or wherever needed
  }

}


 

 
