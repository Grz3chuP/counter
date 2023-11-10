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
  newObjectsList: ObjectInterface[] = [];
constructor(private addItemService: AddItemsService) {
}
 ngOnInit(): void {
  // this.dateFrom = DateTime.now().toISO()
  // this.dateTo = DateTime.now().toISO()
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
    let test: string[] = [];
     // this.uniqObjectsName = [...new Set(this.newObjectsList.map((object) => object.object_name))]
    test = [...new Set(this.newObjectsList.map((object) => object.object_name))]
    console.log(test);
    return test;

  };
    protected readonly categoryList = categoryList;

}
