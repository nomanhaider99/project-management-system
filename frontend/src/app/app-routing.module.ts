import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './shared/components/landing/landing.component';
import { LoginComponent } from './features/auth/user/login/login.component';
import { RegisterComponent } from './features/auth/user/register/register.component';
import { WhyComponent } from './shared/components/why/why.component';
import { BusinessLoginComponent } from './features/auth/business/login/login.component';
import { BusinessRegisterComponent } from './features/auth/business/register/register.component';
import { OnBoardingBusinessComponent } from './features/onboarding/business/business.component';
import { OnBoardingUserComponent } from './features/onboarding/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'user/register',
    component: RegisterComponent,
  },
  {
    path: 'user/login',
    component: LoginComponent,
  },
  {
    path: 'user/onboarding',
    component: OnBoardingUserComponent,
  },
  {
    path: 'user/dashboard',
    component: OnBoardingUserComponent,
  },
  {
    path: 'business/register',
    component: BusinessRegisterComponent,
  },
  {
    path: 'business/login',
    component: BusinessLoginComponent,
  },
  {
    path: 'business/onboarding',
    component: OnBoardingBusinessComponent,
  },
  {
    path: 'business/dashboard',
    component: OnBoardingUserComponent,
  },
  {
    path: 'why',
    component: WhyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
