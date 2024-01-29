import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SectorDetails } from '../models/sectorData';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root', 
})
export class GetDataIslandService {
	private sectorDataUrl: string = environment.sectorData;

	constructor(private http: HttpClient) {}

	getSectorData(): Observable<SectorDetails> {
		return this.http.get<SectorDetails>(this.sectorDataUrl);
	}
}
