import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { ShowCategoriesComponent } from '../show-categories/show-categories.component';


@Component({
  selector: 'app-rightlayout',
  standalone: true,
  imports: [ShowCategoriesComponent,RouterOutlet],
  templateUrl: './rightlayout.component.html',
  styleUrl: './rightlayout.component.css'
})
export class RightlayoutComponent {

}
