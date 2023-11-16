import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTime } from 'luxon';
import {actualDateForThisWeekMonday, categoryIdStore, loading} from "../../../store/data";
import {ObjectInterface, RootObjectInterface} from "../../../interfaces/ObjectsInterface";
import {switchMap} from "rxjs";
import {AddItemsService} from "../../../service/add-items.service";
import {MainService} from "../../../main.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-history.component.html',
  styleUrl: './add-history.component.css'
})
export class AddHistoryComponent implements OnInit{
@Input() actualWeekStart: any;
@Input() categoryId: any;
@Input() actualWeekEnd: string = '';
@Input() actualIndexForDate: number = 0;
@Input() actualObjectsForDay: ObjectInterface[] = [];
@Input() panelId: number = 0;
@Output() closeAddPanelId = new EventEmitter <number>();
newObjectsList: ObjectInterface[] = [];
  uniqueEventsName: string[] = [];

  actualDateForDay: string = '';
  eventToAdd: string = '';
  valueToAdd: number = 0;

constructor(private addItemsService: AddItemsService, private mainService: MainService) {
}
ngOnInit(): void {

if(actualDateForThisWeekMonday() === '') {
  actualDateForThisWeekMonday.set(DateTime.now().startOf('week'));
  this.actualDateForDay = actualDateForThisWeekMonday().plus( {days: this.actualIndexForDate} ).toFormat('dd.MM.yyyy');
}
  this.actualDateForDay = actualDateForThisWeekMonday().plus( {days: this.actualIndexForDate} ).toFormat('dd.MM.yyyy');
 this.showEventHistory(this.categoryId);
}
addEventToDataBase() {
 console.log(this.eventToAdd + ' ' + this.valueToAdd + ' ' + actualDateForThisWeekMonday().plus( {days: this.actualIndexForDate} ) + ' ' + this.categoryId);
  this.addObject();
}

  showEventHistory(categoryId: number ) {
    loading.set(true);
    this.addItemsService.getObjectsList(categoryId, DateTime.now().minus({day: 30}), DateTime.now())
      .pipe(
        switchMap((response: RootObjectInterface) => {
          this.newObjectsList = response.objects;
          loading.set(false);
          this.getUniqueEventsName();
          return this.newObjectsList;
        })
      )
      .subscribe({

        error: error => {
          if (this.mainService.checkIfUnauthenticatedAndRedirectIfSo(error)) return;
          loading.set(false);
          console.log(error);
        }
      });
  }

  getUniqueEventsName() {
    this.uniqueEventsName =  [...new Set(this.newObjectsList.map((object) => object.object_name))];
      this.eventToAdd = this.uniqueEventsName[0];
  }

  addObject() {
    loading.set(true);
    this.addItemsService.createItemWithDate(this.eventToAdd, this.valueToAdd, this.categoryId , actualDateForThisWeekMonday().plus( {days: this.actualIndexForDate} ))
      .pipe()
      .subscribe({
        next: response => {
          this.closeAddPanelId.emit(this.panelId);
          loading.set(false);
        },
        error: error => {
          alert('Błąd dodawania obiektu\n' + error.error.message);
          loading.set(false);

        }

      });
  }
  closeAddPanel() {
    this.closeAddPanelId.emit(this.panelId);
  }
}
