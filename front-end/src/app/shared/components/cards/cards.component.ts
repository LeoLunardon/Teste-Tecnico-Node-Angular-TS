import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SharedModule } from '../../modules/shared.modules';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
  
})
export class CardsComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() imageUrl!: string;
  @Output() cardClicked = new EventEmitter<void>();
}
