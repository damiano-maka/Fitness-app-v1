import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { repeatPasswordValidator } from './repeat-pass';
interface RegistrationForm {
  username:FormControl<string>;
  email: FormControl<string>,
  password: FormControl<string>,
  repeatPassword: FormControl<string>
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registrationForm: FormGroup<RegistrationForm> = new FormGroup<RegistrationForm>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    repeatPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    username: new FormControl('', { 
      nonNullable: true,
      validators: [Validators.required]
    }),
  }, {
    validators: [repeatPasswordValidator]
  });

  constructor(private auth : AuthService,private router: Router){

  }

  onRegister(): void {
    this.auth.register({
      username: this.registrationForm.controls.username.value,
      email: this.registrationForm.controls.email.value,
      password: this.registrationForm.controls.password.value,
      isAdmin: false
    }).subscribe((response) => {

      if(response){
       this.router.navigate(['/login']);
      }else{
        console.log("non registato errore ")
      }
    })
  }
}
