import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.modules';
import { RegisterModalService } from '../../../core/services/register-modal-service';
import { TokenService } from '../../../shared/services/token.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { PersonsListService } from '../services/person-list/person-list.service';
import { NzModalService } from 'ng-zorro-antd/modal';

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
  filterStatus: string | null = null;

  constructor(
    private registerModalService: RegisterModalService,
    private tokenService: TokenService,
    private router: Router,
    private notification: NzNotificationService,
    private personsListService: PersonsListService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.getAllPersons();

    this.registerModalService.userCreatedObservable.subscribe(() => {
      this.getAllPersons();
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

  onPersonSelect(selectedPersonId: string): void {
    this.selectedPersonId = selectedPersonId;
    this.personsListService
      .getPersonWithActivities(this.selectedPersonId)
      .subscribe(
        (response: any) => {
          this.activities = response.activities.map((activity: any) => ({
            ...activity,
            status: this.classifyActivity(activity),
          }));
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

  deleteActivity(activityId: string): void {
    this.personsListService.deleteActivityFromPerson(activityId).subscribe(
      () => {
        this.notification.create(
          'success',
          'Atividade excluída com sucesso',
          ''
        );
        this.sortActivities();
        this.onPersonSelect(this.selectedPersonId!);

      },
      (error) => {
        console.error(error);
        this.notification.create('error', 'Erro ao excluir a atividade', '');
      }
    );
  }

  showDeleteConfirm(activityId: string): void {
    this.modal.confirm({
      nzTitle: 'Tem certeza que deseja deletar esta atividade?',
      nzContent: 'Esta ação não pode ser desfeita.',
      nzOkText: 'Sim',
      nzOkType: 'primary',
      nzOnOk: () => this.deleteActivity(activityId),
      nzCancelText: 'Não',
    });
  }

  classifyActivity(activity: any): string {
    const currentDate = new Date();
    const startDate = new Date(activity.startDate);
    const endDate = new Date(activity.endDate);

    if (currentDate < startDate) {
      return 'Não iniciada';
    } else if (currentDate >= startDate && currentDate <= endDate) {
      return 'Em execução';
    } else {
      return 'Finalizado';
    }
  }
  sortActivities(): void {
    if (!this.filterStatus) {
      return;
    }

    this.personsListService
      .getPersonWithActivities(this.selectedPersonId!)
      .subscribe(
        (response: any) => {
          this.activities = response.activities.map((activity: any) => ({
            ...activity,
            status: this.classifyActivity(activity),
          }));

          // Aplica o filtro nas atividades com base no status selecionado
          switch (this.filterStatus) {
            case 'Todas':
              this.activities = this.activities;
              break;
            case 'Em execução':
              this.activities = this.activities.filter(
                (activity) => activity.status === 'Em execução'
              );
              break;
            case 'Finalizado':
              this.activities = this.activities.filter(
                (activity) => activity.status === 'Finalizado'
              );
              break;
            case 'Não iniciada':
              this.activities = this.activities.filter(
                (activity) => activity.status === 'Não iniciada'
              );
              break;
            default:
              break;
          }
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
