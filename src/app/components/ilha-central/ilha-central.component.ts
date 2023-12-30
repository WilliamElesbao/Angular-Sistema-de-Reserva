import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

import { GetDataIslandService } from 'src/app/services/get-data-island.service'

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

  constructor(
    private modalService: ModalService,
    private getDataIslandService: GetDataIslandService,
  ) { }

  ngOnInit(): void {
    this.getIlhasData()

  }

  getIlhasData() {
    this.getDataIslandService.getIslandData().subscribe(data => {
      this.ilhas = data.dados_ilha
      // console.log(this.ilhas)
    })
  }
}
