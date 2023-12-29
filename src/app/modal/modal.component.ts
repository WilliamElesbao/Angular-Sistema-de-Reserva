import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../modal.service';
import { IlhaCentralComponent } from '../ilha-central/ilha-central.component'


interface Mesa {
  id: number;
  nome: string;
}

interface Ilha {
  id: number;
  nome: string;
  mesas: Mesa[];
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {

  @Input() mesaNome: string | undefined;
  @Input() mesaId: number | undefined;
  @Input() ilhaNome: string | undefined;
  @Input() ilhaId: number | undefined;
  @Input() branch: string | undefined;
  @Input() pcType: string | undefined;
  @Input() serialNumberPc: string | undefined;

  showModal: boolean = false;
  btnContent: string = '';

  title: string = 'Reservar'

  mesaValue:  any;
  ilhaValue:  any;
  nome:string = '';
  constructor(
    public modalService: ModalService,
    private ilhaCentralComponent: IlhaCentralComponent
    ) {}

  ngOnInit(): void {
    const btnContent = this.ilhaCentralComponent.btnContent
    this.btnContent = btnContent

  }

  openModal() {
    this.showModal = true;
    console.log(`${this.ilhaNome} - ${this.ilhaId} - ${this.mesaNome} - ${this.mesaId}`)
  }

  hideModal() {
    this.showModal = false;
  }
}
