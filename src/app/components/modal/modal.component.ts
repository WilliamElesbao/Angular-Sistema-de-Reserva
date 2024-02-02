// modal.component.ts
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Reservation, BookingDetails } from 'src/app/models/reservation.model';
import { ConflictCheckerService } from '../../services/conflict-checker.service';

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
	@Input() reservations: Reservation[] = [];

	formData: BookingDetails = {
		name: '',
		startDate: '',
		endDate: '',
		frequency: 'none',
		daysOfTheWeekSelected: this.daysOfTheWeekSelected,
		comment: '',
	};

	constructor(
		private localStorageService: LocalStorageService,
		public conflictCheckerService: ConflictCheckerService,
		private cd: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.reservations = this.localStorageService.getReservations();
	}

	capturarDadosFormulario() {
		if (!this.conflictCheckerService.isNotEmpty(this.formData.name)) {
			alert('Por favor, insira um nome válido.');
			return;
		}

		if (
			!this.conflictCheckerService.areDatesValid(
				this.formData.startDate,
				this.formData.endDate
			)
		) {
			alert('Por favor, insira datas válidas.');
			return;
		}

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

		if (
			!this.conflictCheckerService.isReservationDuplicate(
				newReservation.bookingDetails[0],
				this.reservations,
				this.sectorId,
				this.stationId
			)
		) {
			this.localStorageService.saveReservation(newReservation);
			this.showModal = false;
			// Limpar campos do formulário
			this.formData = {
				name: '',
				startDate: '',
				endDate: '',
				frequency: 'none',
				daysOfTheWeekSelected: this.daysOfTheWeekSelected,
				comment: '',
			};
			// Atualizar dados recuperados
			this.reservations.push(newReservation);
			this.reservations = [...this.reservations];
			this.cd.detectChanges(); // Forçar a detecção de mudanças
		} else {
			alert(
				'Já há uma reserva registrada para o mesmo setor, estação, data e horário.'
			);
		}
	}

	isFormValid(): boolean {
		const isNameValid = this.conflictCheckerService.isNotEmpty(
			this.formData.name
		);
		const areDatesValid = this.conflictCheckerService.areDatesValid(
			this.formData.startDate,
			this.formData.endDate
		);
		const isFrequencyValid = this.conflictCheckerService.isFrequencyValid(
			this.formData.frequency
		);

		if (isNameValid && areDatesValid && !isFrequencyValid) {
			// show btn save
			return true;
		} else if (
			isNameValid &&
			areDatesValid &&
			(this.formData.frequency === 'semanalmente' ||
				this.formData.frequency === 'mensalmente')
		) {
			// Exibe o botão "Save" se haver pelo menos um dia da semana está marcado
			return this.formData.daysOfTheWeekSelected.some((day) => day);
		} else {
			return false;
		}
	}

	isRepetitionInvalid(): boolean {
		return (
			(this.formData.frequency === 'semanalmente' ||
				this.formData.frequency === 'mensalmente') &&
			!this.formData.daysOfTheWeekSelected.some((day) => day)
		);
	}

	openModal() {
		this.showModal = true;
	}

	hideModal() {
		this.showModal = false;
	}
}
