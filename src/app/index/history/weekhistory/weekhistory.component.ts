import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-weekhistory',
  templateUrl: './weekhistory.component.html',
  styleUrls: ['./weekhistory.component.css']
})
export class WeekhistoryComponent {
@Input() actualEndOfWeek: string = '';
@Input() startOfWeek: string = '';
@Input() weekTotal: number = 0;
@Input() weekTotalEvents: number = 0;
}
