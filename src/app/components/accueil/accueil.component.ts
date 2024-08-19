import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  constructor(private router: Router) {}
navigateToProductOverview() {
  this.router.navigate(['/shopping']); 
  setTimeout(() => {
    const element = document.getElementById('product-overview');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100); 
}
  }

