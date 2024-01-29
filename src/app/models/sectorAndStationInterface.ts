export interface Sector {
	sectorId: number;
	sectorName: string;
	stations: Station[];
}

interface Station {
	stationId: number;
	stationName: string;
	branch: string;
	pcType: string;
	serialNumberPc: string;
}