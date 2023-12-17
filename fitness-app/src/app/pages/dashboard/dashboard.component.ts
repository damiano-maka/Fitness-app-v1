import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { allenameto } from 'src/app/models/allenamenti.model';
import { AllenamentiService } from 'src/app/services/allenamenti.service';
import { CookieService } from 'ngx-cookie';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private service: AllenamentiService,private cdr: ChangeDetectorRef,private cookieService: CookieService) {}
  datiAllenamento: allenameto[] = [];
  exercise: string = 'cardio';

  ngOnInit(): void {
    this.loadExercises();
  }

  loadExercises(): void {
    this.service.getExercisesByMuscle(this.exercise).subscribe(
      (result) => {
        if (Array.isArray(result)) {
          this.datiAllenamento = result;
        } else {
          this.datiAllenamento = [result];
        }
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  scegliAllenamento(nomeAllenamento: string): void {
    this.exercise = nomeAllenamento;
    this.loadExercises(); 
  }

  allenamentoAggiunto(allenamento: allenameto): void {
    const userData: string | undefined = this.cookieService.get('user');
    if (userData) {
      const u = JSON.parse(userData);
      const utente = Number(u.user.id);
      this.service.addAllenamento(utente,allenamento).subscribe(() => {
        console.log("fatto");
      }) 
    }
  }
  
}