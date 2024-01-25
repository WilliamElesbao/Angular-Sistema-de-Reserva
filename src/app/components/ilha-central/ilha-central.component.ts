import { Component, OnInit } from '@angular/core';
import { GetDataIslandService } from 'src/app/services/get-island-data.service';

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
  selector: 'app-ilha-central',
  templateUrl: './ilha-central.component.html',
  styleUrls: ['./ilha-central.component.css', 'responsive.component.css'],
})
export class IlhaCentralComponent implements OnInit {
  ilhas: Ilha[] = []; // Array para armazenar dados das ilhas

  constructor(private getDataIslandService: GetDataIslandService) {}

  ngOnInit(): void {
    this.getIlhasData(); // Obtém os dados das ilhas ao inicializar o componente
  }

  // Obtém os dados das ilhas por meio do serviço GetDataIslandService
  getIlhasData() {
    this.getDataIslandService.getIslandData().subscribe((data) => {
      this.ilhas = data.dados_ilha_central; // Atualiza o array ilhas com os dados recuperados
      // console.log(this.ilhas); // Exibe as ilhas recuperadas no console
    });
  }
}
