import {Component, OnInit} from '@angular/core';
import {categoryIdStore, categoryList} from "../../store/data";
import {AddItemsService} from "../../service/add-items.service";
import {ObjectInterface, RootObjectInterface} from "../../interfaces/ObjectsInterface";
import {DateTime} from "luxon";
import {switchMap} from "rxjs";
import {animation, useAnimation} from "@angular/animations";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit{

  selectedObject: string = '';
  categoryId: any;
  newObjectsList: ObjectInterface[] = [];
  weekdays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  loading: boolean = false;
  actualShownWeekStart: string = '';
  actualShownWeekEnd: string = '';
  constructor(private addItemsService: AddItemsService) {

  }

  ngOnInit(): void {
    this.actualShownWeekStart = this.getMonday().toFormat('dd.MM.yyyy');
    this.actualShownWeekEnd = this.endOfWeek().toFormat('dd.MM.yyyy');
    this.showHistory(categoryIdStore()!);
    if (categoryIdStore() === undefined) {
    this.loading = false;
    }
    else {
      this.categoryId = categoryIdStore()!;
    }
  }

  protected readonly categoryList = categoryList;

  showHistory(categoryId: number ) {
    this.loading = true;
    this.addItemsService.getObjectsList(categoryId, this.getMonday(), this.endOfWeek())
      .pipe(
        switchMap((response: RootObjectInterface) => {
          console.log(response);
          this.newObjectsList = response.objects;
          this.loading = false;
          return this.newObjectsList;
        })
      )
      .subscribe({

        error: error => {
          console.log(error);
        }
      });
  }
  showHistoryChildrenAccess(week:number) {
    console.log(week);
    this.showHistoryPrevious(this.categoryId, week)
  }
  showHistoryPrevious(categoryId: number, minusWeek:number) {
    const newMonday = this.getMonday().minus({weeks: minusWeek});
    const newEndOfWeek = this.endOfWeek().minus({weeks: minusWeek});
    this.actualShownWeekStart = newMonday.toFormat('dd.MM.yyyy');
    this.actualShownWeekEnd = newEndOfWeek.toFormat('dd.MM.yyyy');
    this.loading = true;
    this.addItemsService.getObjectsList(categoryId, newMonday, newEndOfWeek)
      .pipe(
        switchMap((response: RootObjectInterface) => {
          console.log(response);
          this.newObjectsList = response.objects;
          this.loading = false;
          return this.newObjectsList;
        })
      )
      .subscribe({

        error: error => {
          console.log(error);
        }
      });
  }

  //wskazanie poniedzialku jako pierwszego dnia tygodnia

  getMonday() {
    const now = DateTime.now()
    console.log(now.weekday);
    const day = now.weekday;
    const lastMonday =  (9 - day ) % 7;
    const monday = now.minus({days: lastMonday}).set({hour: 0, minute: 0, second: 0, millisecond: 0});
    return monday;

  }
  endOfWeek() {
    const startOfWeek = this.getMonday();
    const endOfWeek = startOfWeek.plus({days: 6}).set({hour: 23, minute: 59, second: 59, millisecond: 999});
    return endOfWeek;
  }
  getDayOfWeekList(day: number) {
   const dayList = this.newObjectsList.filter(object =>    {
    const createdAtDate =  DateTime.fromISO(object.created_at)
     return createdAtDate.weekday  === day + 1 });
    return dayList;
  }
 getWeekTotal() {
    const weekTotal = this.newObjectsList.reduce((sum, object) => sum + object.value, 0);
    return weekTotal;
 }

  getDayTotalValue(day: number) {
    const dayList = this.getDayOfWeekList(day);
    const dayTotalValue = dayList.reduce((sum, object) => sum + object.value, 0);
    return dayTotalValue;
  }
  protected readonly DateTime = DateTime;
  protected readonly animation = animation;
  protected readonly useAnimation = useAnimation;
}




