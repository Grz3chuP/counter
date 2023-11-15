import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTime } from 'luxon';
import {actualDateForThisWeekMonday} from "../../../store/data";
import {ObjectInterface} from "../../../interfaces/ObjectsInterface";

@Component({
  selector: 'app-add-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-history.component.html',
  styleUrl: './add-history.component.css'
})
export class AddHistoryComponent implements OnInit{
@Input() actualWeekStart: any;
@Input() actualWeekEnd: string = '';
actualDateForDay: string = '';
@Input() actualIndexForDate: number = 0;
@Input() actualObjectsForDay: ObjectInterface[] = [];


ngOnInit(): void {
  console.log(this.actualWeekStart);
  this.actualDateForDay = actualDateForThisWeekMonday().plus( {days: this.actualIndexForDate} ).toFormat('dd.MM.yyyy');
}
whatDayIsIt() {

}
  // getUniqueEventsName() {
  //   this.uniqueEventsName =  [...new Set(this.newObjectsList.map((object) => object.object_name))];
  //   console.log(this.uniqueEventsName);
  // }
}
