import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
];
