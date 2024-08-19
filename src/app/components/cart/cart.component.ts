import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { InformationsComponent } from '../informations/informations.component';
import { CartItemsComponent } from '../cart-items/cart-items.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent,InformationsComponent,CartItemsComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

}
