import { Component, OnInit,Input } from '@angular/core';
import { GetDataIslandService } from 'src/app/services/get-island-data.service';
import { Sector } from '../../models/sectorAndStationInterface';
import { Reservation } from '../../models/reservationInterface';


@Component({
	selector: 'app-ilha-central',
	templateUrl: './ilha-central.component.html',
	styleUrls: ['./ilha-central.component.css'],
})
export class IlhaCentralComponent implements OnInit {
	sectors: Sector[] = [];
	dadosRecuperados: Reservation[] = []; // Adicione essa linha
	constructor(private getDataIslandService: GetDataIslandService) {}

	ngOnInit() {
		this.getSectorsData();
	}
	
	getSectorsData() {
		console.log('aasdada')
		this.getDataIslandService.getSectorData().subscribe((data) => {
			this.sectors = data.sectors.slice(0, 5); // Atualiza o array ilhas com os dados recuperados
		});
	}
}
