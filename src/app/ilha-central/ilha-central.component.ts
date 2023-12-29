import { Component, OnInit } from '@angular/core';
import info_ilhas_mesas from '../../assets/data/dados_ilhas_centrais.json';
import { ModalService } from '../modal.service';


interface Mesa {
  id: number;
  nome: string;

  branch?: string;
  pcType?: string;
  serialNumberPc?: string;
}

interface Ilha {
  id: number;
  nome: string;
  mesas: Mesa[];
}

@Component({
  selector: 'app-ilha-central',
  templateUrl: './ilha-central.component.html',
  styleUrls: ['./ilha-central.component.css']
})

export class IlhaCentralComponent implements OnInit {

  btnContent: string = 'Reservar'
  ilhas: Ilha[] = []

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {

    if(info_ilhas_mesas) {
      this.ilhas = info_ilhas_mesas.dados_ilha
      // this.qntMesas = ilhas_mesas.ilhas_centrais[0]['mesas'] // ajustar dinamicidade

      // // verificar quantidade de mesas por ilha
      // this.qntMesas = this.ilhas.forEach((ilha: any) => {
      //   console.log(`${ilha.nome} ${ilha.id} - ${ilha.mesas.length} ${ilha.mesas[0]['nome']}.`);
      // });

    }
  }

}
