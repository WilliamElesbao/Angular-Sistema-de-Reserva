import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
	private readonly KEY_RESERVE = 'reservations';

	saveReservation(reservation: Reservation) {
		const reserve = this.getReservations();
		reserve.push(reservation);
		localStorage.setItem(this.KEY_RESERVE, JSON.stringify(reserve));
	}

	getReservations(): Reservation[] {
		const reserveStr = localStorage.getItem(this.KEY_RESERVE);
		return reserveStr ? JSON.parse(reserveStr) : [];
	}

	getReservationsBySector(sectorId: number): Reservation[] {
		const reserve = this.getReservations();
		return reserve.filter((reservation) => reservation.sectorId === sectorId);
	}

	getFormData(key: string): Reservation[] {
		const reservationDetails = localStorage.getItem(key);
		return reservationDetails ? JSON.parse(reservationDetails) : [];
	}
}
