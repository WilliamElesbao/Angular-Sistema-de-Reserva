import { Component, OnInit } from '@angular/core';
import { GetDataIslandService } from 'src/app/services/get-island-data.service';
import { Sector } from '../../models/sectorAndStationInterface';

@Component({
	selector: 'app-ilha-central',
	templateUrl: './ilha-central.component.html',
	styleUrls: ['./ilha-central.component.css'],
})
export class IlhaCentralComponent implements OnInit {
	sectors: Sector[] = [];

	constructor(private getDataIslandService: GetDataIslandService) {}

	ngOnInit() {
		this.getSectorsData();
	}

	getSectorsData() {
		this.getDataIslandService.getSectorData().subscribe((data) => {
			this.sectors = data.sectors.slice(0, 5); // Atualiza o array ilhas com os dados recuperados
		});
	}
}
