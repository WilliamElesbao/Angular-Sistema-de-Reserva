import { Component, OnInit } from '@angular/core';
import { GetDataIslandService } from '../../services/get-island-data.service'

// Interfaces para definir a estrutura de Mesa e Ilha
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
  selector: 'app-ilha-janela',
  templateUrl: './ilha-janela.component.html',
  styleUrls: ['./ilha-janela.component.css','./responsive.component.css']
})
export class IlhaJanelaComponent implements OnInit {

  ilhas: Ilha[] = [] // Array para armazenar dados das ilhas

  constructor(private getDataIslandService: GetDataIslandService) { }

  ngOnInit(): void {
    this.getIslandData(); // Obtém os dados das ilhas ao inicializar o componente
  }

  getIslandData() {
    this.getDataIslandService.getIslandData().subscribe(data => {
      this.ilhas = data.dados_ilha_janela; // Atualiza o array ilhas com os dados recuperados
    })
  }
}
