import { Component, OnInit } from '@angular/core';
import { GetDataIslandService } from '../../services/get-sector-data.service';
import { Sector } from '../../models/sectorAndStationInterface';
import { Reservation } from 'src/app/models/reservation.model';

@Component({
	selector: 'app-ilha-janela',
	templateUrl: './ilha-janela.component.html',
	styleUrls: ['./ilha-janela.component.css', './responsive.component.css'],
})
export class IlhaJanelaComponent implements OnInit {
	sectors: Sector[] = [];
	reservations: Reservation[] = [];
	constructor(private getDataIslandService: GetDataIslandService) {}

	ngOnInit() {
		this.getSectorsData();
	}

	getSectorsData() {
		this.getDataIslandService.getSectorData().subscribe((data) => {
			this.sectors = data.sectors.slice(5, 13);
		});
	}
}
