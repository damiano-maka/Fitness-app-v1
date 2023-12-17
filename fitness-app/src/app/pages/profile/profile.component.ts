import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { AllenamentiService } from 'src/app/services/allenamenti.service';
import { userResponse } from 'src/app/models/user.model';
import { allenamentoUtente, allenameto } from 'src/app/models/allenamenti.model';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  utente!: userResponse;
  allenamenti: Array<allenamentoUtente> = [];

  constructor(
    private cookieService: CookieService,
    private allenamentiService: AllenamentiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getProfileData();
    this.getAllenamentiByUserId();
  }

  getProfileData(): void {
    const userData: string | undefined = this.cookieService.get('user');
    if (userData) {
      const u = JSON.parse(userData);
      this.utente = u;
    }
  }

  getAllenamentiByUserId(): void {
    const userId = this.utente.user.id;
    this.allenamentiService.getAllenamentiByUserId(userId)
      .subscribe((data) => {
        this.allenamenti = data
        this.cdr.detectChanges(); 
      });
  }

  public removeMovieFromFavorites(allenamento: allenamentoUtente): void {
    this.allenamentiService.removeFromProfile(allenamento.id)
      .pipe(
        switchMap(() => this.allenamentiService.getAllenamentiByUserId(this.utente.user.id))
      )
      .subscribe(
        (data: Array<allenamentoUtente>) => {
          this.allenamenti = data;
          this.cdr.detectChanges(); 
        }
      );
  }

}
