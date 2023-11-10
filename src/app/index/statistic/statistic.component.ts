import {Component, computed, OnInit} from '@angular/core';
import {categoryList} from "../../store/data";
import {AddItemsService} from "../../service/add-items.service";
import {switchMap} from "rxjs";
import {ObjectInterface, RootObjectInterface} from "../../interfaces/ObjectsInterface";
import {DateTime} from "luxon";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit{
  categoryId: number | undefined;
  loading: boolean = false;
  dateFrom: any;
  dateTo: any;
  uniqObjectsName: string[] = [];
  uniqName: string = '';
  newObjectsList: ObjectInterface[] = [];
  newObjectNameList: ObjectInterface[] = [];
  weekdays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
constructor(private addItemService: AddItemsService) {
}
 ngOnInit(): void {
   this.dateFrom = DateTime.now().toLocaleString();
   console.log(this.dateFrom);
   this.dateTo = DateTime.now().toISO();
   console.log(this.dateTo);
}
// getUniqObjectsName() {
//   const uniqObjectsName: string[] = [];
//   this.addItemService.getObjectsList(this.categoryId!)
//     .subscribe((response) => {
//       response.objects.forEach((object) => {
//         if (!uniqObjectsName.includes(object.name)) {
//           uniqObjectsName.push(object.name);
//         }
//       });
//     });
//   return uniqObjectsName;
//
//
// }
  showHistoryPrevious(categoryId: number) {
    this.loading = true;
    if (this.dateFrom === undefined) {
      this.loading = false;
      alert('Please select date from');
    }
    else if (this.dateTo === undefined) {
      this.loading = false;
      alert('Please select date to');
    }
    else if (categoryId === undefined) {
      this.loading = false;
      alert('Please select category');

    }
  //  musze zmienic czas na 00:00:00
    //na format ISO

    const newDateFrom = new Date(this.dateFrom);
    newDateFrom.setHours(0, 0, 0, 0).toString();
    const formattedDateFrom = newDateFrom.toISOString();
    const newDateTo = new Date(this.dateTo);
    newDateTo.setHours(23, 59, 59, 59).toString();
    const formattedDateTo = newDateTo.toISOString();
    this.addItemService.getObjectsList(categoryId, formattedDateFrom, formattedDateTo)
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
  //computed sprawdza czy obiekt jest nowy czy zmieniony

  checkIfNewObjectChanged =() => {
    let uniqName: string[] = [];
     // this.uniqObjectsName = [...new Set(this.newObjectsList.map((object) => object.object_name))]
    uniqName = [...new Set(this.newObjectsList.map((object) => object.object_name))]
    console.log(uniqName);
    this.uniqObjectsName = uniqName;
    return uniqName;

  };
  getEventListForDay = () => {
    this.newObjectNameList = this.newObjectsList.filter((object) => object.object_name.includes(this.uniqName));
  }
    protected readonly categoryList = categoryList;
  getDayOfWeekList(day: number) {
    const dayList = this.newObjectNameList.filter(object =>    {
      const createdAtDate =  DateTime.fromISO(object.created_at)
      return createdAtDate.weekday  === day + 1 });
    return dayList;
  }

  getDayTotalValue(day: number) {
    const dayList = this.getDayOfWeekList(day);
    const dayTotalValue = dayList.reduce((sum, object) => sum + object.value, 0);
    return dayTotalValue;
  }
  protected readonly event = event;
}
