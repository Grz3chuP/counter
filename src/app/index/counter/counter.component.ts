import {Component, OnInit} from '@angular/core';
import {AddItemsService} from "../../service/add-items.service";
import {Category, RootObject} from "../../interfaces/CategoriesInterfaces";
import {of, switchMap, tap, timeout} from "rxjs";






@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit{

  categories: Category[] = [];
  eventValue: number = 0;
  newCategory: string = '';
  eventName: string = '';
  categoryId: number | undefined;
  notyfication: boolean = false;
  loading: boolean = false;
  loadingFinish: boolean = false;
  constructor(private addItemsService: AddItemsService) {


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
        alert('Błąd dodawania kategorii\n' + error.error.message);
        this.togleNotyfication();
        this.loading = false;
      });

  }
  addObject() {
    if (!this.categoryId) {
      return;
    }
    this.addItemsService.createItem(this.eventName, this.eventValue, this.categoryId)
      .subscribe({
        next: response => {
          console.log(response);
        },
        error: error => {
          console.log(error);
          alert('Błąd dodawania obiektu\n' + error.error.message);
        }

      });
  }


  private getCategoryList() {
    this.addItemsService.getCategoryList()
      .subscribe({
        next: (response: RootObject) => {
          console.log(response);
          this.categories = response.categories;

        },
        error: error => {
          console.log(error);
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
  checkIfIdExist() {
    if (this.categoryId) {
      return  this.categories[27].category_name;
    }
    return '';

  }
}
