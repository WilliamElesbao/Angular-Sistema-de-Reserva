// local-storage.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  saveFormData(key: string, data: any): void {
    const arrayNoLocalStorage: any[] = JSON.parse(localStorage.getItem(key) || '[]');
    arrayNoLocalStorage.push(data);
    localStorage.setItem(key, JSON.stringify(arrayNoLocalStorage));
  }
}
