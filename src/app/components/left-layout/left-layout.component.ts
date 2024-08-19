import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-left-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './left-layout.component.html',
  styleUrl: './left-layout.component.css'
})
export class LeftLayoutComponent {
  constructor(private router: Router) {}
  navigate(destination: string) {
    this.router.navigate([{ outlets: { right: [destination] } }]);
  }

}
