import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedModule } from '../../../shared/modules/shared.modules';
import { RegisterModalService } from '../../../core/services/register-modal-service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { TokenService } from '../../../shared/services/token.service';
import { PersonsActivitiesService } from '../services/activity-register/activity-register.service';
@Component({
  selector: 'app-activity-register-modal',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './activty-register-modal.component.html',
  styleUrls: ['./activty-register-modal.component.scss'],
})
export class ActivityRegisterModalComponent implements OnInit {
  validateForm!: FormGroup;
  isVisible = false;
  isOkLoading = false;
  persons: { id: string; name: string }[] = [];
  selectedPersonId: string | undefined;
  creationDate!: string;

  constructor(
    private http: HttpClient,
    private RegisterModalService: RegisterModalService,
    private notification: NzNotificationService,
    private tokenService: TokenService,
    private router: Router,
    private personsActivitiesService: PersonsActivitiesService
  ) {}

  ngOnInit(): void {
    this.validateForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      creationDate: new FormControl(null, Validators.required),
      personId: new FormControl(null, Validators.required),
    });
    this.RegisterModalService.showModalObservable.subscribe(() => {
      this.showModal();
    });
    this.RegisterModalService.userCreatedObservable.subscribe(() => {
      this.getAllPersons();
    });

    this.getAllPersons();
    this.setCreationDate();
  }

  getAllPersons(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    this.personsActivitiesService.getAllPersons().subscribe(
      (persons: any[]) => {
        this.persons = persons.map((person) => ({
          id: person.id,
          name: person.name,
        }));
      },
      (error) => {
        console.error(error);
        this.notification.create(
          'error',
          'Erro ao carregar lista de pessoas cadastradas',
          ''
        );
      }
    );
  }

  setCreationDate(): void {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    this.creationDate = formattedDate;
    this.validateForm.patchValue({ creationDate: formattedDate });
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
      const { startDate, endDate } = this.validateForm.value;
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start > end) {
        this.notification.create(
          'error',
          'Erro',
          'A data de término não pode ser anterior à data de início.'
        );
        return;
      }

      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });

      this.selectedPersonId = this.validateForm.get('personId')?.value;

      const requestData = {
        activities: [
          { ...this.validateForm.value, personId: this.selectedPersonId },
        ],
      };

      this.personsActivitiesService
        .addActivitiesToPerson(this.selectedPersonId!, requestData.activities)
        .subscribe(
          (response) => {
            console.log(response);
            this.isOkLoading = false;
            this.isVisible = false;
            this.notification.create(
              'success',
              'Sucesso',
              'Atividade cadastrada com sucesso!'
            );
          },
          (error) => {
            console.error(error);
            this.notification.create(
              'error',
              'Erro ao carregar as pessoas',
              ''
            );
            this.isOkLoading = false;
          }
        );
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
