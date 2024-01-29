import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import {
	Reservation,
	BookingDetails,
	HardwareDetails,
} from '../../models/reservationInterface';

@Component({
	selector: 'app-all-reservation',
	templateUrl: './all-reservation.component.html',
	styleUrls: ['./all-reservation.component.css'],
})
export class AllReservationComponent implements OnInit {
	dadosRecuperados: Reservation[] = [];
	listaDeDatas: Date[] = [];
	ilhasComMesas: {
		sectorId: number;
		sectorName: string;
		stations: {
			stationId: number;
			stationName: string;
			hardware: HardwareDetails[];
			bookingDetails: BookingDetails[];
		}[];
	}[] = [];

	showMesasReservadas: boolean = false;

	constructor(private localStorageService: LocalStorageService) {}

	ngOnInit() {
		this.dadosRecuperados = this.localStorageService.getReservations();
		this.dadosRecuperados = this.orderBySectorAndStation(this.dadosRecuperados);
		if (this.dadosRecuperados.length > 0) {
			const reservasAgrupadas = new Map<
				string,
				{
					sectorId: number;
					sectorName: string;
					stations: {
						stationId: number;
						stationName: string;
						hardware: {
							branch: string;
							pcType: string;
							serialNumberPc: string;
						}[];
						bookingDetails: BookingDetails[];
					}[];
				}
			>();

			this.dadosRecuperados.forEach((reserva) => {
				const sectorId = reserva.sectorId.toString();

				if (reservasAgrupadas.has(sectorId)) {
					const existingSector = reservasAgrupadas.get(sectorId)!;
					const existingStation = existingSector.stations.find(
						(station) => station.stationId === reserva.stationId
					);

					if (existingStation) {
						existingStation.bookingDetails.push(reserva.bookingDetails[0]);
					} else {
						existingSector.stations.push({
							stationId: reserva.stationId,
							stationName: reserva.stationName,
							hardware: reserva.hardware,
							bookingDetails: [reserva.bookingDetails[0]],
						});
					}
				} else {
					reservasAgrupadas.set(sectorId, {
						sectorId: reserva.sectorId,
						sectorName: reserva.sectorName,
						stations: [
							{
								stationId: reserva.stationId,
								stationName: reserva.stationName,
								hardware: reserva.hardware,
								bookingDetails: [reserva.bookingDetails[0]],
							},
						],
					});
				}
			});

			this.ilhasComMesas = Array.from(reservasAgrupadas.values());
		}
	}
	isValidDate(dateString: string): string | boolean {
		const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
		return dateString && regex.test(dateString);
	}

	orderBySectorAndStation(reservas: Reservation[]): Reservation[] {
		return reservas.sort((a, b) => {
			// Ordena primeiro pelo sectorId
			if (a.sectorId < b.sectorId) return -1;
			if (a.sectorId > b.sectorId) return 1;

			// Se sectorId for igual, ordena pelo stationId
			if (a.stationId < b.stationId) return -1;
			if (a.stationId > b.stationId) return 1;

			return 0;
		});
	}

	generateDateRange(start: Date, end: Date): Date[] {
		const dates = [];
		let currentDate = new Date(start);

		while (currentDate <= end) {
			dates.push(new Date(currentDate));
			currentDate.setDate(currentDate.getDate() + 1);
		}

		return dates;
	}

	formatDateRange(startDateTime: string, endDateTime: string): string {
		const startDate = new Date(startDateTime);
		const endDate = new Date(endDateTime);

		const formattedStartDate = this.formatDate(startDate);
		const formattedEndDate = this.formatDate(endDate);

		return `${formattedStartDate} - ${formattedEndDate}`;
	}

	getFormattedDays(dadoReserva: any): any {
		const filteredDays = dadoReserva.daysOfTheWeekSelected.filter(
			(day: string) => day !== ''
		);
		return filteredDays.length > 0
			? filteredDays.join(' - ')
			: 'Nenhum dia selecionado';
	}

	formatTimeRange(startDateTime: string, endDateTime: string): string {
		const startDate = new Date(startDateTime);
		const endDate = new Date(endDateTime);

		const formattedStartTime = this.formatTime(startDate);
		const formattedEndTime = this.formatTime(endDate);

		return `${formattedStartTime} - ${formattedEndTime}`;
	}

	private formatDate(date: Date): string {
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	}

	private formatTime(date: Date): string {
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		return `${hours}:${minutes}`;
	}

	ilhaClicadaId: number | null = 0;
	mesaClicadaId: number | null | string = null;

	toggleMesasDaIlha(idIlha: number) {
		this.ilhaClicadaId = this.ilhaClicadaId === idIlha ? null : idIlha;
	}

	toggleInfoDaMesa(idMesa: number) {
		this.mesaClicadaId = this.mesaClicadaId === idMesa ? null : idMesa;
	}

	showStations(id: any) {
		var informacoesDiv: any = document.getElementById(id);

		if (informacoesDiv.classList.contains('hidden-stations')) {
			informacoesDiv.classList.remove('hidden-stations');
			informacoesDiv.classList.add('show-efect');
		} else {
			informacoesDiv.classList.add('hidden-stations');
		}
	}
	showStationDetails(id: any) {
		var informacoesDiv: any = document.getElementById(id);

		if (informacoesDiv.classList.contains('hidden-station-details')) {
			informacoesDiv.classList.remove('hidden-station-details');
		} else {
			informacoesDiv.classList.add('hidden-station-details');
		}
	}
}
