import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { HeroComponent } from "../hero/hero.component";
import { TrustedComponent } from "../trusted/trusted.component";
import { ServiceComponent } from "../service/service.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  standalone: true,
  imports: [NavbarComponent, HeroComponent, TrustedComponent, ServiceComponent, FooterComponent]
})
export class LandingComponent {

}
