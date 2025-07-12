import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { CheckinComponent } from './components/checkin/checkin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { LandingComponent } from './components/landing/landing.component';
import { LogoComponent } from './components/logo/logo.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { ShadowComponent } from './components/shadow/shadow.component';
import { TrustedComponent } from './components/trusted/trusted.component';
import { CompanyComponent } from './components/company/company.component';
import { ServiceComponent } from './components/service/service.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { WhyComponent } from './components/why/why.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    TableComponent,
    InputComponent,
    ButtonComponent,
    CheckinComponent,
    NavbarComponent,
    HeroComponent,
    LandingComponent,
    LogoComponent,
    RegisterComponent,
    LoginComponent,
    PasswordInputComponent,
    TweetComponent,
    ShadowComponent,
    TrustedComponent,
    CompanyComponent,
    ServiceComponent,
    ServiceCardComponent,
    FooterComponent,
    WhyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
