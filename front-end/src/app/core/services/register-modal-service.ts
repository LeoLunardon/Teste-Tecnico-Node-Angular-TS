import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterModalService {
  private showModalSubject = new Subject<void>();
  showModalObservable = this.showModalSubject.asObservable();
  private userCreatedSubject = new Subject<void>();
  userCreatedObservable = this.userCreatedSubject.asObservable();

  constructor() { }

  triggerShowModal() {
    this.showModalSubject.next();
  }
  triggerUserCreated() {
    this.userCreatedSubject.next();
  }
}
