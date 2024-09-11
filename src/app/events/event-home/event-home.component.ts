import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-event-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './event-home.component.html',
  styleUrl: './event-home.component.scss'
})
export class EventHomeComponent {





}
