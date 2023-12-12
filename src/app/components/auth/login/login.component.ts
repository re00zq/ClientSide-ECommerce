import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

import { LoginService } from '../../../services/auth/login.service';
import { UserDataService } from '../../../services/auth/user-data.service';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isLoading: boolean;
  apiError: string;
  faSpinner = faSpinner;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private userDataService: UserDataService,
    private localStorage: LocalStorageService
  ) {
    this.isLoading = false;
    this.apiError = '';
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
    ]),
  });

  handleLogin(form: FormGroup) {
    this.isLoading = true;
    this.loginService.login(form.value).subscribe({
      next: (res) => {
        this.apiError = '';
        this.isLoading = false;
        this.localStorage.setItem(
          'currentUser',
          JSON.stringify({ token: res.token, user: res.user })
        );
        this.router.navigate(['/', 'home']);
        this.userDataService.updateUserData(
          this.localStorage.getItem('currentUser')
        );
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
        this.apiError = error.error.errors
          ? error.error.errors.msg
          : error.error.message;
      },
    });
  }
}
