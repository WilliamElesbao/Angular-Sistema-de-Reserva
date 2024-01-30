// modal.component.ts
import {
	Component,
	Input,
	OnInit,
	ChangeDetectorRef,
	SimpleChanges,
} from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import {
	Reservation,
	BookingDetails,
	HardwareDetails,
} from 'src/app/models/reservationInterface';
import { formatDate } from '@angular/common';

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
	@Input() dadosRecuperados: Reservation[] = [];

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
		private cd: ChangeDetectorRef
	  ) {}

	ngOnInit() {
		// Recuperar dados do localStorage ao inicializar o componente
		this.dadosRecuperados = this.localStorageService.getReservations() || [];
	  }

	capturarDadosFormulario() {
		if (!this.isNameValid()) {
			alert('Por favor, insira um nome válido.');
			return;
		}

		if (!this.areDatesValid()) {
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
		

		if (!this.isReservationDuplicate(newReservation.bookingDetails[0])) {
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
			this.dadosRecuperados.push(newReservation);
			this.dadosRecuperados = [...this.dadosRecuperados];
			this.cd.detectChanges(); // Forçar a detecção de mudanças
		} else {
			alert(
				'Já há uma reserva registrada para o mesmo setor, estação, data e horário.'
			);
		}
	}

	isReservationDuplicate(newReservation: BookingDetails): boolean {
		const newStartDate = new Date(newReservation.startDate);
		const newEndDate = new Date(newReservation.endDate);

		for (const existingReservation of this.dadosRecuperados) {
			const existingStartDate = new Date(
				existingReservation.bookingDetails[0].startDate
			);
			const existingEndDate = new Date(
				existingReservation.bookingDetails[0].endDate
			);

			// Verificar se a nova reserva está contida dentro da reserva existente
			if (
				this.sectorId === existingReservation.sectorId &&
				this.stationId === existingReservation.stationId &&
				((newStartDate >= existingStartDate &&
					newStartDate <= existingEndDate) ||
					(newEndDate >= existingStartDate && newEndDate <= existingEndDate))
			) {
				return true;
			}

			// Verificar se a reserva existente está contida dentro da nova reserva
			if (
				this.sectorId === existingReservation.sectorId &&
				this.stationId === existingReservation.stationId &&
				((existingStartDate >= newStartDate &&
					existingStartDate <= newEndDate) ||
					(existingEndDate >= newStartDate && existingEndDate <= newEndDate))
			) {
				return true;
			}

			// Verificar se há sobreposição de datas
			if (
				this.sectorId === existingReservation.sectorId &&
				this.stationId === existingReservation.stationId &&
				this.isDateConflict(
					existingStartDate,
					existingEndDate,
					newStartDate,
					newEndDate
				)
			) {
				return true;
			}
		}

		return false;
	}

	isSameDate(date1: any, date2: any): boolean {
		return (
			date1.getFullYear() === date2.getFullYear() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getDate() === date2.getDate()
		);
	}

	openModal() {
		this.showModal = true;
	}

	hideModal() {
		this.showModal = false;
	}

	isReservationConflict(
		existingStartDate: Date,
		existingEndDate: Date,
		newStartDate: Date,
		newEndDate: Date
	): boolean {
		// Verificar se há conflito nas datas e horários para usuários diferentes
		return (
			this.isDateConflict(
				existingStartDate,
				existingEndDate,
				newStartDate,
				newEndDate
			) &&
			this.isExactTimeConflict(
				existingStartDate,
				existingEndDate,
				newStartDate,
				newEndDate
			)
		);
	}
	isDateConflict(
		existingStartDate: Date,
		existingEndDate: Date,
		newStartDate: Date,
		newEndDate: Date
	): boolean {
		// Verificar se existe conflito nas datas e horários
		return newEndDate > existingStartDate && newStartDate < existingEndDate;
	}

	isExactTimeConflict(
		existingStartDate: Date,
		existingEndDate: Date,
		newStartDate: Date,
		newEndDate: Date
	): boolean {
		console.log('Novo início:', newStartDate);
		console.log('Novo final:', newEndDate);
		console.log('Existente início:', existingStartDate);
		console.log('Existente final:', existingEndDate);

		// Verificar se existe conflito nas datas e horários exatos
		const conflict =
			(newStartDate >= existingStartDate && newStartDate < existingEndDate) ||
			(newEndDate > existingStartDate && newEndDate <= existingEndDate) ||
			(newStartDate <= existingStartDate && newEndDate >= existingEndDate);

		console.log('Conflito de horário exato:', conflict);

		return conflict;
	}

	onNgModelChange() {
		// console.log('Seleção alterada:', this.formData.frequency);
	}

	isSelectionValid(): boolean {
		return (
			this.formData.frequency !== 'none' &&
			this.formData.frequency !== 'diariamente'
		);
	}

	isNameDateFieldValid(): boolean {
		if (
			this.formData.name !== '' &&
			this.formData.startDate !== '' &&
			this.formData.endDate !== '' &&
			this.formData.startDate <= this.formData.endDate &&
			this.formData.endDate >= this.formData.startDate
		) {
			return true;
		}
		return false;
	}

	isFormValid(): boolean {
		const isNameDateValid = this.isNameDateFieldValid();
		const isSelectionValid = this.isSelectionValid();

		if (isNameDateValid) {
			if (!isSelectionValid) {
				return true; // Exibe o botão "Save" se isNameDateValid e isSelectionValid é falso
			} else if (
				this.formData.frequency === 'none' ||
				this.formData.frequency === 'diariamente' ||
				this.formData.daysOfTheWeekSelected.some((day) => day)
			) {
				return true; // Exibe o botão "Save" se isNameDateValid, isSelectionValid é verdadeiro, e pelo menos um dia da semana está marcado
			}
		}

		return false;
	}

	isNameValid(): boolean {
		return this.formData.name.trim() !== '';
	}

	areDatesValid(): boolean {
		const startDate = new Date(this.formData.startDate);
		const endDate = new Date(this.formData.endDate);
		const currentDate = new Date();

		return (
			this.isNameValid() &&
			startDate >= currentDate &&
			startDate <= endDate &&
			endDate >= currentDate
		);
	}

	isStartDateValid(): boolean {
		const startDate = new Date(this.formData.startDate);
		const currentDate = new Date();
		return startDate >= currentDate;
	}

	isEndDateValid(): boolean {
		const startDate = new Date(this.formData.startDate);
		const endDate = new Date(this.formData.endDate);
		const currentDate = new Date();
		return endDate >= startDate && endDate >= currentDate;
	}

	isRepetitionInvalid(): boolean {
		return (
			(this.formData.frequency === 'semanalmente' ||
				this.formData.frequency === 'mensalmente') &&
			!this.formData.daysOfTheWeekSelected.some((day) => day)
		);
	}

	checkIfReservationExists(newReservation: Reservation): boolean {
		console.log('Verificando se a reserva já existe:', newReservation);

		const newStartDate = new Date(newReservation.bookingDetails[0].startDate);
		const newEndDate = new Date(newReservation.bookingDetails[0].endDate);

		for (const existingReservation of this.dadosRecuperados) {
			const existingStartDate = new Date(
				existingReservation.bookingDetails[0].startDate
			);
			const existingEndDate = new Date(
				existingReservation.bookingDetails[0].endDate
			);

			if (
				this.checkDateConflict(
					existingStartDate,
					existingEndDate,
					newStartDate,
					newEndDate
				) &&
				existingReservation.bookingDetails[0].name.trim() ===
					newReservation.bookingDetails[0].name.trim()
			) {
				console.log('Conflito de Reserva:', true);
				console.log('Dados Recuperados:', this.dadosRecuperados);
				return true; // Indicar que há um conflito
			}
		}

		console.log('Conflito de Reserva:', false);
		console.log('Dados Recuperados:', this.dadosRecuperados);

		return false; // Indicar que não há conflito
	}

	areReservationsIdentical(
		reservation1: Reservation,
		reservation2: Reservation
	): boolean {
		// Comparar todos os campos relevantes para verificar se as reservas são idênticas
		const areBookingDetailsEqual =
			JSON.stringify(reservation1.bookingDetails) ===
			JSON.stringify(reservation2.bookingDetails);
		const areHardwareEqual =
			JSON.stringify(reservation1.hardware) ===
			JSON.stringify(reservation2.hardware);

		// Verificar se as datas e horários são iguais
		const areDatesEqual = this.areDatesEqual(
			reservation1.bookingDetails[0],
			reservation2.bookingDetails[0]
		);

		return (
			reservation1.sectorId === reservation2.sectorId &&
			reservation1.stationId === reservation2.stationId &&
			reservation1.sectorName === reservation2.sectorName &&
			reservation1.stationName === reservation2.stationName &&
			areBookingDetailsEqual &&
			areHardwareEqual &&
			areDatesEqual
		);
	}

	areDatesEqual(details1: BookingDetails, details2: BookingDetails): boolean {
		// Comparar datas e horários para verificar se são iguais
		return (
			details1.startDate === details2.startDate &&
			details1.endDate === details2.endDate
		);
	}

	checkDateConflict(
		existingStartDate: Date,
		existingEndDate: Date,
		newStartDate: Date,
		newEndDate: Date
	): boolean {
		// Verificar se existe conflito nas datas e horários
		return newEndDate > existingStartDate && newStartDate < existingEndDate;
	}

	addNewReservation(newBookingDetails: any): boolean {
		const newReservation: Reservation = {
		  sectorId: this.sectorId,
		  stationId: this.stationId,
		  bookingDetails: [newBookingDetails],
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
	  
		if (!this.checkIfReservationExists(newReservation)) {
		  this.dadosRecuperados.push(newReservation);
		  this.dadosRecuperados = [...this.dadosRecuperados];
		  this.cd.detectChanges(); // Forçar a detecção de mudanças
	  
		  // Salvar no localStorage
		  this.localStorageService.saveReservation(newReservation);
	  
		  return true; // Indicar que a reserva foi adicionada com sucesso
		} else {
		  console.log('Já existe uma reserva idêntica.');
		  return false; // Indicar que há uma reserva idêntica
		}
	  }
}
