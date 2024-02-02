export interface Sector {
	sectorId: number;
	sectorName: string;
	stations: Station[];
}

interface Station {
	stationId: number;
	stationName: string;
	hardware: HardwareDetails[];
	bookingDetails: BookingDetails[];
}

export interface Reservation {
	sectorId: number;
	sectorName: string;
	stationId: number;
	stationName: string;
	hardware: HardwareDetails[];
	bookingDetails: BookingDetails[];
}

interface HardwareDetails {
	branch: string;
	pcType: string;
	serialNumberPc: string;
}
[];

export interface BookingDetails {
	name: string;
	startDate: string;
	endDate: string;
	frequency: string;
	daysOfTheWeekSelected: string[];
	comment: string;
}
