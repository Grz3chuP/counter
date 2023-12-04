import {Component, OnInit} from '@angular/core';
import {AddItemsService} from "../../service/add-items.service";
import {Category, RootObject} from "../../interfaces/CategoriesInterfaces";
import {of, switchMap, tap} from "rxjs";
import {categoryIdStore, categoryList, isClicked, loading, manageButtonClicked} from "../../store/data";
import {MainService} from "../../main.service";
import {DateTime} from "luxon";
import {ObjectInterface, RootObjectInterface} from "../../interfaces/ObjectsInterface";
import {trigger, state, style, animate, transition} from "@angular/animations";
import {maxValue, step} from "../../store/options";
import {OptionsInterface, RootOptionsInterface} from "../../interfaces/OptionsInterface";


@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  animations: [
    trigger('close', [
      state('true', style({
        opacity: 1
      })),
      state('false', style({
        opacity: 0
      })),
      transition('true <=> false', animate(500))
    ]),
    ]
})
export class CounterComponent implements OnInit{

  categories: Category[] = [];
  newObjectsList: ObjectInterface[] = [];
  eventValue: number = 0;
  newCategory: string = '';
  eventName: string = '';
  categoryId: number | undefined;
  notyfication: boolean = false;
  loadingFinish: boolean = false;
  addingFinish: boolean = false;
  uniqueEventsName: string[] = [];
  options: boolean = false;
  optionsList: OptionsInterface | undefined;

  protected readonly step = step;
  protected readonly maxValue = maxValue;

  constructor(private addItemsService: AddItemsService, private mainService: MainService) {


  }

  ngOnInit(): void {
    this.getCategoryList();
    this.getOptions();

  }

  addCategory() {

    this.togleNotyfication();
    loading.set(true);
    this.addItemsService.createCategory(this.newCategory)
      .pipe(

        switchMap(() => this.getCategoryListAndContinue())
      )
      .subscribe(() => {
        this.togleNotyfication();
        this.loadObjectName();

      }, (error: any) => {
        console.error('Błąd dodawania kategorii', error);
        if (this.mainService.checkIfUnauthenticatedAndRedirectIfSo(error)) return;
        alert('Błąd dodawania kategorii\n' + error.error.message);
        this.togleNotyfication();
        loading.set(false);
      });

  }
  addObject() {

    loading.set(true);

    if (!this.categoryId) {
      loading.set(false);
      alert('Wybierz kategorię')
      return;
    }
    if (!this.eventName) {
      loading.set(false);
      alert('Wpisz nazwę obiektu')
      return;
    }
      console.log('adding event' + this.eventName + ' ' + this.eventValue + ' ' + this.categoryId);
    this.addItemsService.createItem(this.eventName, this.eventValue, this.categoryId)

      .pipe()
      .subscribe({
        next: response => {
          loading.set(false);
          this.addingFinish = true;
          this.addingCompleted()
          categoryIdStore.set(this.categoryId);
          this.loadObjectName();
        },
        error: error => {
          alert('Błąd dodawania obiektu\n' + error.error.message);
          loading.set(false);
          this.eventName = '';
        }

      });
  }


  private getCategoryList() {
    this.addItemsService.getCategoryList()
      .subscribe({
        next: (response: RootObject) => {
          this.categories = response.categories;
          this.categoryId = this.categories[this.getLastAddedCategory()!].id;
          categoryIdStore.set(this.categoryId);
          categoryList.set(this.categories);
          if(this.categories.length === 0) {
            return;
          }
          this.loadObjectName();
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

        this.categories = response.categories;

      }),
      switchMap(() => {
        // Kontynuuj operacje tutaj, gdy lista jest już dostępna
        const newAddedCategory = this.categories.find(category => category.category_name === this.newCategory);
        if (newAddedCategory) {
          this.categoryId = newAddedCategory.id;
        }
        this.newCategory = '';
        loading.set(false);
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
    loading.set(true);
    if(this.categoryId === undefined) {
      loading.set(false);
      return;
         }

    this.addItemsService.getObjectsList(this.categoryId, this.getLast2Weeks(), DateTime.now())
      .pipe(
        switchMap((response: RootObjectInterface) => {

          this.newObjectsList = response.objects;
          this.getUniqueEventsName();
          loading.set(false);
          categoryIdStore.set(this.categoryId);
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

  }

  getLast2Weeks() {
    const now = DateTime.now();
    return now.minus({weeks: 2});
  }


  changeEventName(event: string) {
    this.eventName = event;
  }

  getLastAddedCategory() {
    if (this.categories.length === 0) {
      return;
    }

    return this.categories.length - 1;
  }
  protected readonly loading = loading;

  optionsOnOff() {
    this.options = !this.options;
    manageButtonClicked()
  }

  protected readonly isClicked = isClicked;

  removeCategoryFromList(idToRemove: number) {

    this.categories = this.categories.filter(category => category.id !== idToRemove);
    this.getCategoryList();
  }

  plusAndMinusValue(number: number) {
    if(this.eventValue === 0 && number === -1) {
      return;
    }
    this.eventValue += number;
  }
  // //////////////////////////
  // load otions From DataBase
  // ////////////////////////////
  private getOptions() {
    this.addItemsService.getOptions()
      .subscribe({
        next: (response: RootOptionsInterface) => {
          console.log('tutaj musze widziec' + response.options);
          this.optionsList = response.options;
          step.set(this.optionsList.step_value);
          maxValue.set(this.optionsList.max_value);

        },
        error: error => {
          console.log(error);
          if (this.mainService.checkIfUnauthenticatedAndRedirectIfSo(error)) return; //specjalnie zmieszczone w 1 linijce żeby nie było widać bardzo
          alert('Błąd pobierania opcji\n' + error.error.message);
        }
      });

  }
  saveOptions() {
    loading.set(true);
    this.addItemsService.saveOptions(step(), maxValue())
       .subscribe({
        next: (response: any) => {
          console.log(response);
          loading.set(false);
          alert('Options saved');
        },
        error: (error: any) => {
          if (this.mainService.checkIfUnauthenticatedAndRedirectIfSo(error)) return;
          loading.set(false);
          console.log(error);
        }
      });
  }
  optionsOnOffWithSave() {
   this.optionsOnOff();
    this.saveOptions();
  }



}
