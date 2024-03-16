import { SharedModule } from '../../../shared/modules/shared.modules';
import { LoginResponse } from '../../../shared/models/login/login-response.model';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { AuthService } from '../services/login/auth.service';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [SharedModule],
  standalone: true,
})
export class LoginComponent {
  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [true],
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      const { email, password } = this.validateForm.value;

      this.authService.login(email!, password!).subscribe(
        (response) => {
          if (response.token && response.email && response.tokenCreatedAt) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('email', response.email);
            localStorage.setItem('tokenCreatedAt', response.tokenCreatedAt);

            this.notification.create(
              'success',
              'Login realizado com sucesso',
              ''
            );
            this.router.navigate(['home']);
          }
        },
        (error) => {
          console.error('Login inválido', error);
          this.notification.create('error', 'Login inválido', '');
          this.router.navigate(['login']);
        }
      );
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private http: HttpClient,
    private router: Router,
    private notification: NzNotificationService,
    private authService: AuthService
  ) {}
}
