import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { allenamentoUtente, allenameto } from '../models/allenamenti.model';

@Injectable({
  providedIn: 'root'
})
export class AllenamentiService {

  private apiUrl = 'https://api.api-ninjas.com/v1/exercises';
  private baseUrl: string = 'http://localhost:3000';
  private allenamentiPerUtente: { [userId: number]: allenameto[] } = {};
  constructor(private http: HttpClient) {}

  getExercisesByMuscle(chose: string): Observable<allenameto> {
    const headers = new HttpHeaders().set('X-Api-Key', 'SmggjJgMll/dTE79c9dqew==CiglWrpU43JzXUa0');

    return this.http.get<allenameto>(`https://api.api-ninjas.com/v1/exercises?type=${chose}`, { headers });
  }

  withoutSpaces(input: string): string {
    return input.replace(/\s/g, '');
  }

  addAllenamento(userId:number, allenament : allenameto):Observable<allenameto>{
    const allenamento = {
      id: this.withoutSpaces(allenament.name) + '-usr-' + userId,
      userId: userId,
      allenament: {
        name: allenament.name,
        type: allenament.type,
        muscle: allenament.muscle,
        equipment: allenament.equipment,
        difficulty: allenament.difficulty,
        instructions: allenament.instructions,
      }
      
   };
    console.log(allenamento);
    return this.http.post<allenameto>(`${this.baseUrl}/allenamenti`,allenamento  )
  }

 
  getAllenamentiByUserId(userId: number): Observable<Array<allenamentoUtente>> {
    return this.http.get<Array<allenamentoUtente>>(`${this.baseUrl}/allenamenti?userId=${userId}`)
  }

  removeFromProfile(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/allenamenti/${id}`);
  }


}
