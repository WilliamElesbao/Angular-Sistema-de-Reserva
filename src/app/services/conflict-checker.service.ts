import { Injectable } from '@angular/core';
import { BookingDetails, Reservation } from '../models/reservation.model';

@Injectable({
	providedIn: 'root',
})
export class ConflictCheckerService {
	constructor() {}

	isNotEmpty(fields: string): boolean {
		return fields.trim() !== '';
	}

	isStartDateValid(startDate: string | Date): boolean {
		startDate = new Date(startDate);
		const currentDate = new Date();

		return startDate >= currentDate;
	}

	isEndDateValid(startDate: string | Date, endDate: string | Date): boolean {
		startDate = new Date(startDate);
		endDate = new Date(endDate);
		const currentDate = new Date();

		return endDate >= startDate && endDate >= currentDate;
	}

	areDatesValid(startDate: string | Date, endDate: string | Date): boolean {
		startDate = new Date(startDate);
		endDate = new Date(endDate);
		const currentDate = new Date();

		return (
			// this.conflictCheckerService.isNotEmpty(this.formData.name) &&
			startDate >= currentDate && startDate <= endDate && endDate >= currentDate
		);
	}

	isFrequencyValid(frequency: string): boolean {
		return frequency !== 'none' && frequency !== 'diariamente';
	}

	isReservationDuplicate(
		newReservation: BookingDetails,
		reservations: Reservation[],
		sectorId: number,
		stationId: number
	): boolean {
		const newStartDate = new Date(newReservation.startDate);
		const newEndDate = new Date(newReservation.endDate);

		for (const existingReservation of reservations) {
			const existingStartDate = new Date(
				existingReservation.bookingDetails[0].startDate
			);
			const existingEndDate = new Date(
				existingReservation.bookingDetails[0].endDate
			);

			// Verificar se a nova reserva está contida dentro da reserva existente
			if (
				sectorId === existingReservation.sectorId &&
				stationId === existingReservation.stationId &&
				((newStartDate >= existingStartDate &&
					newStartDate <= existingEndDate) ||
					(newEndDate >= existingStartDate && newEndDate <= existingEndDate))
			) {
				return true;
			}

			// Verificar se a reserva existente está contida dentro da nova reserva
			if (
				sectorId === existingReservation.sectorId &&
				stationId === existingReservation.stationId &&
				((existingStartDate >= newStartDate &&
					existingStartDate <= newEndDate) ||
					(existingEndDate >= newStartDate && existingEndDate <= newEndDate))
			) {
				return true;
			}

			// Verificar se há sobreposição de datas
			if (
				sectorId === existingReservation.sectorId &&
				stationId === existingReservation.stationId &&
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

	isDateConflict(
		existingStartDate: Date,
		existingEndDate: Date,
		newStartDate: Date,
		newEndDate: Date
	): boolean {
		// Verificar se existe conflito nas datas e horários
		return newEndDate > existingStartDate && newStartDate < existingEndDate;
	}
}
