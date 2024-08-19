import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AccueilComponent } from '../accueil/accueil.component';
import { ServicesComponent } from '../services/services.component';
import { ProductoverviewComponent } from '../productoverview/productoverview.component';
import { InformationsComponent } from '../informations/informations.component';

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [NavbarComponent,AccueilComponent,ServicesComponent,ProductoverviewComponent,InformationsComponent],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.css'
})
export class ShoppingComponent {

}
