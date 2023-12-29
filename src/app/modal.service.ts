import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private showModal: boolean = false;

  constructor() { }

  openModal() {
    this.showModal = true;
  }

  hideModal() {
    this.showModal = false;
  }

  getModalStatus() {
    return this.showModal;
  }
}
