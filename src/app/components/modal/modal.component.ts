// modal.component.ts
import { Component, Input } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

interface FormData {
  nome: string;
  startDate: any;
  endDate: any;
  frequency: any;
  daysOfTheWeekSelected: any[];
  comment: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  btnContent: string = 'Reservar';
  titleModal: string = 'Reservar';
  showModal: boolean = false;
  diasDaSemanaSelecionados: string[] = ['', '', '', '', ''];

  @Input() ilhaNome: string | undefined;
  @Input() ilhaId: number | undefined;
  @Input() mesaNome: string | undefined;
  @Input() mesaId: number | undefined;
  @Input() branch: string | undefined;
  @Input() pcType: string | undefined;
  @Input() serialNumberPc: string | undefined;

  formData: FormData = {
    nome: '',
    startDate: '',
    endDate: '',
    frequency: 'none',
    daysOfTheWeekSelected: this.diasDaSemanaSelecionados,
    comment: '',
  };

  constructor(private localStorageService: LocalStorageService) {}

  capturarDadosFormulario() {
    const diasSelecionados: string[] = [];
    const diasDaSemana = ['seg', 'ter', 'qua', 'qui', 'sex'];

    for (const [index, selected] of this.diasDaSemanaSelecionados.entries()) {
      diasSelecionados.push(selected ? diasDaSemana[index] : '');
    }

    this.formData.daysOfTheWeekSelected = diasSelecionados;

    this.localStorageService.saveFormData('reservas', {
      ...this.formData,
      infoLocal: `${this.ilhaNome} ${this.ilhaId} - ${this.mesaNome} ${this.mesaId} - ${this.branch}-${this.pcType}-${this.serialNumberPc}`,
    });
    this.showModal = false;
  }

  openModal() {
    this.showModal = true;
  }

  hideModal() {
    this.showModal = false;
  }
}
