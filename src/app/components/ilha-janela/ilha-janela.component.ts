import { Component, OnInit } from '@angular/core';
import info_ilhas_mesas from '../../../assets/data/dados_ilhas_janela.json'

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
  selector: 'app-ilha-janela',
  templateUrl: './ilha-janela.component.html',
  styleUrls: ['./ilha-janela.component.css']
})
export class IlhaJanelaComponent implements OnInit {

  btnContent: string = 'Reservar'
  ilhas: Ilha[] = []

  constructor() { }

  ngOnInit(): void {

    if(info_ilhas_mesas){
      this.ilhas = info_ilhas_mesas.dados_ilha
      // console.log(this.ilhas)
    }

  }

}
