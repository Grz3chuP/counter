import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Category} from "../../../../interfaces/CategoriesInterfaces";
import {AddItemsService} from "../../../../service/add-items.service";
import {MainService} from "../../../../main.service";
import {FormsModule} from "@angular/forms";
import {loading} from "../../../../store/data";

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './options.component.html',
  styleUrl: './options.component.css'
})
export class OptionsComponent {
@Input() categoriesList: Category[] = [];
  categoryId: number | undefined;

  constructor(private addItemsService: AddItemsService, private mainService: MainService) {

  }
  removeCategory() {
    if(!this.categoryId){
      return;
    }
    this.addItemsService.deleteCategory(this.categoryId)
      .pipe()
      .subscribe({
        next: response => {
          console.log(response);
         alert('Category removed');
        },
        error: error => {
          if (this.mainService.checkIfUnauthenticatedAndRedirectIfSo(error)) return;
          console.log(error);
        }
      })
  }

  protected readonly loading = loading;
}
