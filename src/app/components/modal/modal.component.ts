import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  // Valores padrão para o botão e o título do modal
  btnContent: string = 'Reservar';
  titleModal: string = 'Reservar';

  // Variável que controla a exibição do modal
  showModal: boolean = false;

  // Inputs que recebem dados carregados do dados_ilhas_centrais.json no componente ilha-central.component.ts
  @Input() ilhaNome: string | undefined;
  @Input() ilhaId: number | undefined;
  @Input() mesaNome: string | undefined;
  @Input() mesaId: number | undefined;
  @Input() branch: string | undefined;
  @Input() pcType: string | undefined;
  @Input() serialNumberPc: string | undefined;

  constructor() {}

  // Função para abrir o modal
  openModal() {
    this.showModal = true;
    // console.log(`${this.ilhaNome} - ${this.ilhaId} - ${this.mesaNome} - ${this.mesaId}`)
  }

  // Função para fechar o modal
  hideModal() {
    this.showModal = false;
  }
}
