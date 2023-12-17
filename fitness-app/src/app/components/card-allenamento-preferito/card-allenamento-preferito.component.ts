import { Component ,Input ,EventEmitter,Output } from '@angular/core';
import { allenamentoUtente, allenameto } from 'src/app/models/allenamenti.model';

@Component({
  selector: 'app-card-allenamento-preferito',
  templateUrl: './card-allenamento-preferito.component.html',
  styleUrls: ['./card-allenamento-preferito.component.scss']
})
export class CardAllenamentoPreferitoComponent {
  @Input() a!: allenamentoUtente;
  @Output() addClickA: EventEmitter<allenamentoUtente> = new EventEmitter();

  onAddClickA(): void {
    this.addClickA.emit(this.a);
  }
}