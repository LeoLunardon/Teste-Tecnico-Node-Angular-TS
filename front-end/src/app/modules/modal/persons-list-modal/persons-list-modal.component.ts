import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.modules';
import { RegisterModalService } from '../../../core/services/register-modal-service';
import { TokenService } from '../../../shared/services/token.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { PersonsListService } from '../services/person-list/person-list.service';

@Component({
  selector: 'app-persons-list-modal',
  templateUrl: './persons-list-modal.component.html',
  styleUrls: ['./persons-list-modal.component.css'],
  standalone: true,
  imports: [SharedModule],
})
export class PersonsListModalComponent implements OnInit {
  isVisible = false;
  persons: { id: string; name: string }[] = [];
  selectedPersonId: string | undefined;
  activities: Array<any> = [];
  personProps: any | null = null;

  constructor(
    private registerModalService: RegisterModalService,
    private tokenService: TokenService,
    private router: Router,
    private notification: NzNotificationService,
    private personsListService: PersonsListService
  ) {}

  ngOnInit(): void {
    this.getAllPersons();

    this.registerModalService.userCreatedObservable.subscribe(() => {
      this.getAllPersons();
    });
  }

  getAllPersons(): void {
    this.personsListService.getAllPersons().subscribe(
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

  showModal(): void {
    if (!this.tokenService.checkTokenValidity()) {
      this.router.navigate(['/login']);
      this.notification.create('error', 'Sessão expirada', '');
      return;
    }
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    this.selectedPersonId = undefined;
    this.activities = [];
    this.personProps = null;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.selectedPersonId = undefined;
    this.activities = [];
    this.personProps = null;
  }

  onPersonSelect(selectedPersonId: string): void {
    this.selectedPersonId = selectedPersonId;
    this.personsListService
      .getPersonWithActivities(this.selectedPersonId)
      .subscribe(
        (response: any) => {
          this.activities = response.activities;
          this.personProps = response.user;
        },
        (error) => {
          console.error(error);
          this.notification.create(
            'error',
            'Erro ao carregar as atividades',
            ''
          );
        }
      );
  }
}
