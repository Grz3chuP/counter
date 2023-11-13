import {Component, computed, OnInit} from '@angular/core';
import {categoryIdStore, categoryList} from "../../store/data";
import {AddItemsService} from "../../service/add-items.service";
import {reduce, switchMap} from "rxjs";
import {ObjectInterface, RootObjectInterface} from "../../interfaces/ObjectsInterface";
import {DateTime} from "luxon";
import {RootObject} from "../../interfaces/CategoriesInterfaces";
import {MainService} from "../../main.service";

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

  pastelColors: string[] = [
    '#FFD1DC', // Light Pink
    '#FFECB3', // Light Yellow
    '#B2DFDB', // Light Teal
    '#E1BEE7', // Light Purple
    '#C8E6C9', // Light Green
    '#FFCCBC', // Light Peach
    '#B3E0FF', // Light Blue
    '#F0F4C3', // Light Lime
    '#D7CCC8', // Light Brown
    '#FFD180', // Light Orange
  ];
constructor(private addItemsService: AddItemsService, private mainService: MainService) {
  this.dateFrom = DateTime.now().toFormat('yyyy-MM-dd');
  this.dateTo = DateTime.now().toFormat('yyyy-MM-dd');

}
 ngOnInit(): void {
   if (categoryList().length === 0) {
     this.getCategoryList();

   } else {
     this.categoryId = categoryIdStore()!;
     this.showHistoryPrevious(categoryIdStore()!);
   }
 }
  private getCategoryList() {
    this.addItemsService.getCategoryList()
      .subscribe({
        next: (response: RootObject) => {
          categoryList.set(response.categories);
          this.categoryId = this.categoryList()[this.getLastAddedCategory()!].id;
          this.showHistoryPrevious(this.categoryId!);
        },
        error: error => {
          console.log(error);
          if (this.mainService.checkIfUnauthenticatedAndRedirectIfSo(error)) return; //specjalnie zmieszczone w 1 linijce żeby nie było widać bardzo
          alert('Błąd pobierania listy kategorii\n' + error.error.message);
        }
      });

  }

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
    this.addItemsService.getObjectsList(categoryId, formattedDateFrom, formattedDateTo)
      .pipe(
        switchMap((response: RootObjectInterface) => {
          console.log(response);
          this.newObjectsList = response.objects;
          this.newObjectNameList = this.newObjectsList
          this.checkIfNewObjectChanged();
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
  getUniqDayOfWeekList(day: number) {
    const dayList = this.newObjectNameList.filter(object =>    {
      const createdAtDate =  DateTime.fromISO(object.created_at)
      return createdAtDate.weekday  === day + 1 });
    const uniqDayList = [...new Set(dayList.map((object) => object.object_name))]
    return uniqDayList;
  }
  getDayTotalValue(day: number) {
    const dayList = this.getDayOfWeekList(day);
    const dayTotalValue = dayList.reduce((sum, object) => sum + object.value, 0);
    return dayTotalValue;
  }

  getLastAddedCategory() {
    if (this.categoryList().length === 0) {
      return;
    }

    return this.categoryList().length - 1;
  }
  protected readonly event = event;


  singleDaySumOfValue(dayOfWeekList: ObjectInterface[], singleDay: string) {
    const singleDaySumOfValue = dayOfWeekList.filter(object => object.object_name === singleDay)
      .reduce((sum, object) => sum + object.value, 0);
    return singleDaySumOfValue;
  }
  singleDaySumOfEvents(dayOfWeekList: ObjectInterface[], singleDay: string) {
    const singleDaySumOfValue = dayOfWeekList.filter(object => object.object_name === singleDay)
      .length;
    return singleDaySumOfValue;
  }
}
