import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient  } from '@angular/common/http';
import { RegistrationForm, UserReq } from '../models/user.model';
import { CookieService } from 'ngx-cookie';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseURL: string = 'http://localhost:3000';

  userName: string = "";

  public isLoggedIn$: BehaviorSubject<boolean> = new  BehaviorSubject(this.cookieService.get('accessToken') !== undefined)
  
  public setLoggedIn(value: boolean) {
    this.zone.run(() => {
      this.isLoggedIn$.next(value);
    });
  }
 
  constructor(private http: HttpClient ,private cookieService: CookieService,private zone: NgZone ) {  }
  
  public getLoggedInUser(): Observable<any> {
    return this.isLoggedIn$.asObservable();
  }

  public login(body: UserReq): Observable<UserReq> {
    return this.http.post<UserReq>(`${this.baseURL}/login`, body)
  }
 

  public register(body: RegistrationForm): Observable<RegistrationForm> {
    return this.http.post<RegistrationForm>(`${this.baseURL}/register`, body);
  }


}

