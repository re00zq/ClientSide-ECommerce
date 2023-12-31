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

import { RegisterService } from '../../../services/auth/register.service';
import { UserDataService } from '../../../services/auth/user-data.service';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isLoading: boolean;
  apiError: string;
  faSpinner = faSpinner;
  constructor(
    private registerService: RegisterService,
    private router: Router,
    private userDataService: UserDataService,
    private localStorage: LocalStorageService
  ) {
    this.isLoading = false;
    this.apiError = '';
  }

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
    ]),
    rePassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^(\\+201|01|00201)[0-2,5]{1}[0-9]{8}$'),
    ]),
  });

  handleRegister(form: FormGroup) {
    this.isLoading = true;
    this.registerService.register(form.value).subscribe({
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
