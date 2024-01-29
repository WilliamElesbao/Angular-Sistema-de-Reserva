import { Component, OnInit } from '@angular/core';
import { GetDataIslandService } from '../../services/get-island-data.service';
import { Sector } from '../../models/sectorAndStationInterface';

@Component({
	selector: 'app-ilha-janela',
	templateUrl: './ilha-janela.component.html',
	styleUrls: ['./ilha-janela.component.css', './responsive.component.css'],
})
export class IlhaJanelaComponent implements OnInit {
	sectors: Sector[] = [];

	constructor(private getDataIslandService: GetDataIslandService) {}

	ngOnInit() {
		this.getSectorsData();
	}

	getSectorsData() {
		this.getDataIslandService.getSectorData().subscribe((data) => {
			this.sectors = data.sectors.slice(5, 13); // Atualiza o array ilhas com os dados recuperados
		});
	}
}
