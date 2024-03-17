import { Component, ViewChild, viewChild } from '@angular/core';
import { SharedModule } from '../../shared/modules/shared.modules';
import { CardsComponent } from '../../shared/components/cards/cards.component';
import { SidemenuComponent } from '../../shared/components/sidemenu/sidemenu.component';
import { PersonRegisterModalComponent } from '../modal/register-person-modal/person-register-modal.component';
import { ActivityRegisterModalComponent } from '../modal/register-activty-modal/activty-register-modal.component';
import { PersonsListModalComponent } from '../modal/list-persons-modal/persons-list-modal.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SharedModule,
    CardsComponent,
    SidemenuComponent,
    PersonRegisterModalComponent,
    ActivityRegisterModalComponent,
    PersonsListModalComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  @ViewChild(PersonRegisterModalComponent) modal!: PersonRegisterModalComponent;
  @ViewChild(ActivityRegisterModalComponent)
  modal2!: ActivityRegisterModalComponent;
  @ViewChild(PersonsListModalComponent) modal3!: PersonsListModalComponent;
  openPersonRegisterModal(): void {
    this.modal.showModal();
  }
  openActivityRegisterModal(): void {
    this.modal2.showModal();
  }
  openPersonsListModal(): void {
    this.modal3.showModal();
  }
}
