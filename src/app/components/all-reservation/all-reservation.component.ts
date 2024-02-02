import { Component, OnInit } from '@angular/core';
import { Reservation, Sector } from '../../models/reservation.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { ReservationService } from '../../services/reservation.service';

@Component({
	selector: 'app-all-reservation',
	templateUrl: './all-reservation.component.html',
	styleUrls: ['./all-reservation.component.css'],
})
export class AllReservationComponent implements OnInit {
	reservationsData: Reservation[] = [];
	sectors: Sector[] = [];
	clickedSector: number | null = null;
	clickedStationId: number | null | string = null;

	constructor(
		private localStorageService: LocalStorageService,
		public reservationService: ReservationService
	) {}

	ngOnInit() {
		this.reservationsData = this.localStorageService.getReservations();
		this.reservationsData = this.reservationService.orderBySectorAndStation(
			this.reservationsData
		);

		if (this.reservationsData.length > 0) {
			this.groupReservationsBySectorAndStation();
		}
	}

	private groupReservationsBySectorAndStation(): void {
		const groupedSectors = new Map<string, Sector>();

		this.reservationsData.forEach((reservation) => {
			const sectorKey = reservation.sectorId.toString();

			if (groupedSectors.has(sectorKey)) {
				const existingSector = groupedSectors.get(sectorKey)!;
				const existingStation = existingSector.stations.find(
					(station) => station.stationId === reservation.stationId
				);

				if (existingStation) {
					existingStation.bookingDetails.push(reservation.bookingDetails[0]);
				} else {
					existingSector.stations.push({
						stationId: reservation.stationId,
						stationName: reservation.stationName,
						hardware: reservation.hardware,
						bookingDetails: [reservation.bookingDetails[0]],
					});
				}
			} else {
				groupedSectors.set(sectorKey, {
					sectorId: reservation.sectorId,
					sectorName: reservation.sectorName,
					stations: [
						{
							stationId: reservation.stationId,
							stationName: reservation.stationName,
							hardware: reservation.hardware,
							bookingDetails: [reservation.bookingDetails[0]],
						},
					],
				});
			}
		});

		this.sectors = Array.from(groupedSectors.values());
	}

	showStations(id: string) {
		const elementContainer: HTMLElement | null = document.getElementById(id);

		if (
			elementContainer &&
			elementContainer.classList.contains('hidden-station')
		) {
			elementContainer.classList.remove('hidden-station');
			elementContainer.classList.add('show-efect');
		} else if (elementContainer) {
			elementContainer.classList.add('hidden-station');
		}
	}

	showStationDetails(id: string) {
		const elementContainer: HTMLElement | null = document.getElementById(id);

		if (
			elementContainer &&
			elementContainer.classList.contains('hidden-station-details')
		) {
			elementContainer.classList.remove('hidden-station-details');
		} else if (elementContainer) {
			elementContainer.classList.add('hidden-station-details');
		}
	}
}
