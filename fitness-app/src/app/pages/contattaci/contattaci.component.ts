import { HttpClient } from '@angular/common/http';
import { Component ,ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

interface ContactForm {
  username: FormControl<string>;
  email: FormControl<string>,
  messaggio: FormControl<string>
}
@Component({
  selector: 'app-contattaci',
  templateUrl: './contattaci.component.html',
  styleUrls: ['./contattaci.component.scss']
})
export class ContattaciComponent {
  contactForm: FormGroup<ContactForm> = new FormGroup<ContactForm>({
    username: new FormControl('', {
      nonNullable: true,
      validators:[Validators.required]
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    messaggio: new FormControl('', {
      nonNullable: true,
      validators:[Validators.required]
    })
  })
  isEmailSent: boolean = false;
  constructor(private http: HttpClient,private cdr: ChangeDetectorRef) {}
  async onSubmit() {
    emailjs.init("tUwv8kVZR7_otQsNR");

    try {
      const response = await emailjs.send("service_7bpxgfi", "template_i5q8ozd", {
        from_name: this.contactForm.value.username,
        to_name: "ADMIN FITNESS-APP",
        message: this.contactForm.value.messaggio,
        from_email: this.contactForm.value.email,
        subject: "Messaggio dal utente!",
      });

      if (await response.status === 200) { 
        this.isEmailSent = true;
        this.contactForm.reset();
        this.cdr.detectChanges(); 

      } else {
        alert("Errore durante l'invio dell'email");
      }
    } catch (error) {
      console.error('Errore:', error);
      alert("Si è verificato un errore");
    }
  }
}