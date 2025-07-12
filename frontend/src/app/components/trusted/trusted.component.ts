import { Component } from '@angular/core';

@Component({
  selector: 'app-trusted',
  templateUrl: './trusted.component.html',
  styleUrls: ['./trusted.component.css']
})
export class TrustedComponent {
  companies: string[] = ["uplift", "Mojo", "Amazon", "Duolingo", "DigitalSpring"]
}
