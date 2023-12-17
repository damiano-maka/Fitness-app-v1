import { Component ,Input ,EventEmitter,Output } from '@angular/core';
import { allenameto } from 'src/app/models/allenamenti.model';

@Component({
  selector: 'app-card-allenamento',
  templateUrl: './card-allenamento.component.html',
  styleUrls: ['./card-allenamento.component.scss']
})
export class CardAllenamentoComponent {
  @Input() allenamento!: allenameto;
  @Output() addClick: EventEmitter<allenameto> = new EventEmitter();

  onAddClick(): void {
    this.addClick.emit(this.allenamento);
  }
}