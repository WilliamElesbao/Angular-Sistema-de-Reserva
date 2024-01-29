// modal.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import {
	Reservation,
	BookingDetails,
	HardwareDetails,
} from 'src/app/models/reservationInterface';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
	btnContent: string = 'Reservar';
	titleModal: string = 'Reservar';
	showModal: boolean = false;
	daysOfTheWeekSelected: string[] = ['', '', '', '', ''];

	@Input() sectorId: number = 0;
	@Input() sectorName: string = '';
	@Input() stationId: number = 0;
	@Input() stationName: string = '';
	@Input() branch: string = '';
	@Input() pcType: string = '';
	@Input() serialNumberPc: string = '';

	formData: BookingDetails = {
		name: '',
		startDate: '',
		endDate: '',
		frequency: 'none',
		daysOfTheWeekSelected: this.daysOfTheWeekSelected,
		comment: '',
	};

	constructor(private localStorageService: LocalStorageService) {}

	ngOnInit() {}

	capturarDadosFormulario() {
		const selectedDays: string[] = [];
		const daysOfTheWeek = ['seg', 'ter', 'qua', 'qui', 'sex'];
		for (const [index, selected] of this.daysOfTheWeekSelected.entries()) {
			selectedDays.push(selected ? daysOfTheWeek[index] : '');
		}
		this.formData.daysOfTheWeekSelected = selectedDays;
		const newReservation: Reservation = {
			sectorId: this.sectorId,
			stationId: this.stationId,
			bookingDetails: [this.formData],
			sectorName: this.sectorName,
			stationName: this.stationName,
			hardware: [
				{
					branch: this.branch,
					pcType: this.pcType,
					serialNumberPc: this.serialNumberPc,
				},
			],
		};

		this.localStorageService.saveReservation(newReservation);
		this.showModal = false;
	}

	openModal() {
		this.showModal = true;
	}

	hideModal() {
		this.showModal = false;
	}
}
