import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-notyfication',
  templateUrl: './notyfication.component.html',
  styleUrls: ['./notyfication.component.css']
})
export class NotyficationComponent {
  @Input() notyfication: string = '';
  @Input() loadingFinish: boolean = false;

}
