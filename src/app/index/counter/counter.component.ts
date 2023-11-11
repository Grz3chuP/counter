import {Component, OnInit, signal} from '@angular/core';
import {AddItemsService} from "../../service/add-items.service";
import {Category, RootObject} from "../../interfaces/CategoriesInterfaces";
import {of, switchMap, tap, timeout} from "rxjs";
import {categoryIdStore, categoryList} from "../../store/data";
import {MainService} from "../../main.service";
import {DateTime} from "luxon";
import {ObjectInterface, RootObjectInterface} from "../../interfaces/ObjectsInterface";







@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit{

  categories: Category[] = [];
  newObjectsList: ObjectInterface[] = [];
  eventValue: number = 0;
  newCategory: string = '';
  eventName: string = '';
  categoryId: number | undefined;
  notyfication: boolean = false;
  loading: boolean = false;
  loadingFinish: boolean = false;
  addingFinish: boolean = false;
  uniqueEventsName: string[] = [];

  constructor(private addItemsService: AddItemsService, private mainService: MainService) {


  }

  ngOnInit(): void {
    this.getCategoryList();
  }
  // addCategory() {
  //   this.addItemsService.createCategory(this.newCategory)
  //     .subscribe({
  //         next:  response => {
  //          this.getCategoryList()
  //          const newAddedCategory = this.categories.find(category => category.category_name === this.newCategory);
  //          console.log(newAddedCategory);
  //           if (newAddedCategory) {
  //             this.categoryId = newAddedCategory.id;
  //           }
  //           this.newCategory = '';
  //
  //
  //         },
  //         error: error => {
  //           console.log(error);
  //           alert('Błąd dodawania kategorii\n' + error.error.message);
  //         }
  //       }
  //     );
  // }

  addCategory() {
    this.togleNotyfication();
    this.loading = true;
    this.addItemsService.createCategory(this.newCategory)
      .pipe(

        switchMap(() => this.getCategoryListAndContinue())
      )
      .subscribe(() => {
        this.togleNotyfication();

      }, (error: any) => {
        console.error('Błąd dodawania kategorii', error);
        if (this.mainService.checkIfUnauthenticatedAndRedirectIfSo(error)) return;
        alert('Błąd dodawania kategorii\n' + error.error.message);
        this.togleNotyfication();
        this.loading = false;
      });

  }
  addObject() {
    this.loading = true;
    if (!this.categoryId) {
      this.loading = false;
      alert('Wybierz kategorię')
      return;
    }
    if (!this.eventName) {
      this.loading = false;
      alert('Wpisz nazwę obiektu')
      return;
    }

    this.addItemsService.createItem(this.eventName, this.eventValue, this.categoryId)

      .pipe()
      .subscribe({
        next: response => {
          console.log(response);
          this.loading = false;
          this.addingFinish = true;
          this.addingCompleted()
          categoryIdStore.set(this.categoryId);
        },
        error: error => {
          console.log(error);
          alert('Błąd dodawania obiektu\n' + error.error.message);
          this.loading = false;
          this.eventName = '';
        }

      });
  }


  private getCategoryList() {
    this.addItemsService.getCategoryList()
      .subscribe({
        next: (response: RootObject) => {
          console.log(response);
          this.categories = response.categories;
          categoryList.set(this.categories);
        },
        error: error => {
          console.log(error);
          if (this.mainService.checkIfUnauthenticatedAndRedirectIfSo(error)) return; //specjalnie zmieszczone w 1 linijce żeby nie było widać bardzo
          alert('Błąd pobierania listy kategorii\n' + error.error.message);
        }
      });

  }

  togleNotyfication() {
    this.notyfication = !this.notyfication;
  }

  private getCategoryListAndContinue() {
    return this.addItemsService.getCategoryList().pipe(
      tap((response: RootObject) => {
        console.log(response);
        this.categories = response.categories;

      }),
      switchMap(() => {
        // Kontynuuj operacje tutaj, gdy lista jest już dostępna
        const newAddedCategory = this.categories.find(category => category.category_name === this.newCategory);
        if (newAddedCategory) {
          this.categoryId = newAddedCategory.id;
        }
        this.newCategory = '';
        this.loading = false;
        this.loadingFinish = true;
        this.loadingCompleted();
        return of(newAddedCategory); // Zwróć obserwabłę, która emituje nowAddedCategory
      })
    );
  }

  loadingCompleted() {
    setTimeout(() => {
      this.loadingFinish = false;
    }, 1500);
  }
  addingCompleted() {
    setTimeout(() => {
      this.addingFinish = false;
    }, 1500);
  }
// wczytuje liste obiektów z ostatnich 2 tygodni
  // i wyciagam tylko unique nazwy obiektów
  loadObjectName() {
    this.loading = true;
    if(this.categoryId === undefined) {
      this.loading = false;
      return;
         }

    this.addItemsService.getObjectsList(this.categoryId, this.getLast2Weeks(), DateTime.now())
      .pipe(
        switchMap((response: RootObjectInterface) => {
          console.log(response);
          this.newObjectsList = response.objects;
          this.getUniqueEventsName();
          this.loading = false;
          return this.newObjectsList;
        })
      )
      .subscribe({

        error: error => {
          if (this.mainService.checkIfUnauthenticatedAndRedirectIfSo(error)) return;
          console.log(error);
        }
      });
  }
  getUniqueEventsName() {
    this.uniqueEventsName =  [...new Set(this.newObjectsList.map((object) => object.object_name))];
    console.log(this.uniqueEventsName);
  }

  getLast2Weeks() {
    const now = DateTime.now();
    return now.minus({weeks: 2});
  }


  changeEventName(event: string) {
    this.eventName = event;
  }
}
