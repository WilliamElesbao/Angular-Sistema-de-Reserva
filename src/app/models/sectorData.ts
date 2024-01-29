export interface SectorDetails {
	sectors: {
		sectorId: number;
		sectorName: string;
		stations: StationDetails[];
	}[];
};

interface StationDetails {
	stationId: number;
	stationName: string;
	branch: string;
	pcType: string;
	serialNumberPc: string;
}
