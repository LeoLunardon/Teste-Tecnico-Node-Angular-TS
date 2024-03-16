import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared.modules';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css',
})
export class SidemenuComponent {
  public email = localStorage.getItem('email');
  logout() {
    localStorage.clear();
    window.location.reload();
  }
  constructor() {}
}
