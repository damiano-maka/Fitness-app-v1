import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'fitness-app';
  isUserLoged!: boolean;
  u = this.cookieService.get('user');
  constructor(
    private router: Router,
    private auth: AuthService,
    private cookieService: CookieService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.auth.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isUserLoged = isLoggedIn;
      
      this.cdr.detectChanges(); 
    });
  }

  isNotHomeRoute(): boolean {
    return this.router.url !== '/';
  }

  logOut(): void {
    this.cookieService.remove('accessToken');
    this.cookieService.remove('user');
    this.auth.setLoggedIn(false);
    this.router.navigate(['/']);
  }

  getAuthService(): AuthService {
    return this.auth;
  }
}
