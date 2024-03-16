import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register/register.service';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { SharedModule } from '../../../shared/modules/shared.modules';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  validateForm: FormGroup<{
    username: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    checkPassword: FormControl<string>;
  }> = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    checkPassword: ['', [Validators.required]],
    username: ['', [Validators.required]],
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      const { email, password, username } = this.validateForm.value;

      this.registerService
        .register(email!, password!, username!)
        .subscribe((response) => {
          console.log('Usuário criado com sucesso', response);
          this.router.navigate(['login']);
        });
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
    private registerService: RegisterService
  ) {}
}
