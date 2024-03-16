import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.modules';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { RegisterModalService } from '../../../core/services/register-modal-service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TokenService } from '../../../shared/services/token.service';
import { Router } from '@angular/router';
import { PersonRegisterService } from '../services/person-register/person-register.service';

@Component({
  selector: 'app-person-register-modal',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './person-register-modal.component.html',
  styleUrl: './person-register-modal.component.css',
})
export class PersonRegisterModalComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;
  validateForm!: FormGroup;
  confirmModal?: NzModalRef;

  constructor(
    private http: HttpClient,
    private modal: NzModalService,
    private registerModalService: RegisterModalService,
    private notification: NzNotificationService,
    private tokenService: TokenService,
    private router: Router,
    private personRegisterService: PersonRegisterService
  ) {}

  ngOnInit(): void {
    this.validateForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      name: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      number: new FormControl(null, Validators.required),
      complement: new FormControl(null),
      city: new FormControl(null, Validators.required),
    });
  }

  showModal(): void {
    if (!this.tokenService.checkTokenValidity()) {
      this.router.navigate(['/login']);
      this.notification.create('error', 'Sessão expirada', '');
      return;
    }
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      this.submitForm();
      this.isOkLoading = true;
      setTimeout(() => {
        this.isVisible = false;
        this.isOkLoading = false;
      }, 2000);
    } else {
      this.notification.create(
        'error',
        'Erro',
        'Por favor, preencha todos os campos obrigatórios antes de enviar.'
      );
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const { name, email, street, number, complement, city } =
        this.validateForm.value;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });

      const requestData = {
        email,
        name,
        street,
        number,
        complement,
        city,
      };

      this.personRegisterService
        .createPerson(requestData)
        .subscribe((response) => {
          if (response.status === 201) {
            this.registerModalService.triggerUserCreated();
            this.showConfirmationModal();
            this.notification.create(
              'success',
              'Sucesso',
              'Usuário criado com sucesso!'
            );
          }
          this.handleOk();
          this.validateForm.reset();
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  showConfirmationModal(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Confirmação',
      nzContent:
        'Usuário criado com sucesso! Deseja adicionar uma atividade ao usuário?',
      nzOnOk: () => this.registerModalService.triggerShowModal(),
      nzOnCancel: () => console.log('Ação cancelada'),
    });
  }
}
