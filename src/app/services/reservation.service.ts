import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';

@Injectable({
	providedIn: 'root',
})
export class ReservationService {
	constructor() {}

	isValidDate(dateString: string): string | boolean {
		const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
		return dateString && regex.test(dateString);
	}

	orderBySectorAndStation(reservations: Reservation[]): Reservation[] {
		return reservations.sort((a, b) => {
			if (a.sectorId < b.sectorId) return -1;
			if (a.sectorId > b.sectorId) return 1;

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

		return `${this.formatDate(startDate)} - ${this.formatDate(endDate)}`;
	}

	getFormattedDays(daysOfTheWeekSelected: string[]): string {
		const filteredDays = daysOfTheWeekSelected.filter(
			(day) => day.trim() !== ''
		);
		return filteredDays.length > 0
			? filteredDays.join(' - ')
			: 'No days selected';
	}

	formatTimeRange(startDateTime: string, endDateTime: string): string {
		const startDate = new Date(startDateTime);
		const endDate = new Date(endDateTime);

		return `${this.formatTime(startDate)} - ${this.formatTime(endDate)}`;
	}

	private formatDate(date: Date): string {
		return `${this.padNumber(date.getDate())}/${this.padNumber(
			date.getMonth() + 1
		)}/${date.getFullYear()}`;
	}

	private formatTime(date: Date): string {
		return `${this.padNumber(date.getHours())}:${this.padNumber(
			date.getMinutes()
		)}`;
	}

	private padNumber(num: number): string {
		return num.toString().padStart(2, '0');
	}
}
