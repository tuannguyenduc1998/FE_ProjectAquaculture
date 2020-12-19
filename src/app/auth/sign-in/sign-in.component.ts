import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidationHelper from 'src/app/shared/helpers/validation.helper';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UserLoginService } from 'src/app/shared/services/user-login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  formSignIn: FormGroup;
  isSubmitted: boolean;
  invalidMessages: string[];
  formErrors = {
    password: '',
    email: ''
  };
  constructor(
    private userLoginService: UserLoginService,
    private router: Router, private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.formSignIn = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.formSignIn.valueChanges.subscribe(_ => {
      if (this.isSubmitted) {
        this.validateForm();
      }
    });

  }

  validateForm(): boolean {
    this.invalidMessages = ValidationHelper.getInvalidMessages(
      this.formSignIn,
      this.formErrors
    );
    return this.invalidMessages.length === 0;
  }

  onSubmit(type: string): void {
    this.isSubmitted = true;
    if (this.validateForm()) {
      this.userLoginService.loginConnectApi(this.formSignIn.value.email, this.formSignIn.value.password).subscribe(res => {
        this.authenticationService.setAuthenticationModel(res);
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
