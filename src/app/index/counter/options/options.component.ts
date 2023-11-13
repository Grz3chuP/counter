import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Category} from "../../../interfaces/CategoriesInterfaces";
import {AddItemsService} from "../../../service/add-items.service";
import {MainService} from "../../../main.service";
import {FormsModule} from "@angular/forms";
import {isClicked, loading, manageButtonClicked} from "../../../store/data";

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './options.component.html',
  styleUrl: './options.component.css'
})
export class OptionsComponent {
@Input() categoriesList: Category[] = [];
@Output() categoryIdToRemove = new EventEmitter<number>();
  categoryId: number | undefined;

  constructor(private addItemsService: AddItemsService, private mainService: MainService) {

  }
  removeCategory() {
      loading.set(true);
    if(!this.categoryId){
      alert('Select category to remove')
      loading.set(false);
      return;
    }
    this.addItemsService.deleteCategory(this.categoryId)
      .pipe()
      .subscribe({
        next: response => {
          console.log(response);
          loading.set(false);
          this.categoryIdToRemove.emit(this.categoryId!);
         alert('Category removed');
        },
        error: error => {
          if (this.mainService.checkIfUnauthenticatedAndRedirectIfSo(error)) return;
          loading.set(false);

          console.log(error);
        }
      })
  }

  protected readonly loading = loading;
    protected readonly isClicked = isClicked;
}
