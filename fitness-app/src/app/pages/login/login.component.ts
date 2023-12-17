import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserReq } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie';
interface LoginForm {
  email: FormControl<string>,
  password: FormControl<string>
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup<LoginForm> = new FormGroup<LoginForm>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators:[Validators.required]
    })
  })

  constructor(private auth : AuthService,private router: Router, private cookieService: CookieService,){

  }
  onLogin() {
    this.auth
      .login(this.loginForm.value as UserReq)
      .subscribe(
        (data: any) => {
          this.cookieService.put('user', JSON.stringify(data));
          this.cookieService.put('accessToken', data.accessToken);
          this.auth.setLoggedIn(true);
          this.router.navigate(['/allenamenti']); 
        },
        (error) => {
          console.error('Error while setting cookies:', error);
        }
      );
  }
}
