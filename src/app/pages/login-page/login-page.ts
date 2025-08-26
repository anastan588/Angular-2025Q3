import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from 'src/app/services/auth';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  loginForm: FormGroup;
  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      userName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(2)],
      }),
    });
  }

  hide = signal(true);
  hidePassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  protected readonly value = signal('');

  markNameAsTouched() {
    const control = this.loginForm.get('userName');
    if (control?.errors) control?.markAsTouched();
  }

  markPasswordAsTouched() {
    const control = this.loginForm.get('password');
    if (control?.errors) control?.markAsTouched();
  }
  userNameErrors() {
    const control = this.loginForm.get('userName');
    if (control?.hasError('required')) {
      return 'Username is required';
    } else if (control?.hasError('minlength')) {
      return 'Username must be at least 3 characters long';
    } else {
      return null;
    }
  }

  passWordErrors() {
    const control = this.loginForm.get('password');
    if (control?.hasError('required')) {
      return 'Password is required';
    } else if (control?.hasError('minlength')) {
      return 'Password must be at least 2 characters long';
    } else {
      return null;
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      console.log(loginData);
      this.authService.login(loginData).subscribe({
        next: (response) => {
          console.log('Login successful', response,125);
        },
        error: (error) => {
          console.error('Login failed', error);
        },
      });
    } else {
      // Handle validation errors
    }
  }
}
