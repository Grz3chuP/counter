import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Category} from "../../../../interfaces/CategoriesInterfaces";
import {AddItemsService} from "../../../../service/add-items.service";
import {MainService} from "../../../../main.service";

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './options.component.html',
  styleUrl: './options.component.css'
})
export class OptionsComponent {
@Input() categoriesList: Category[] = [];

  constructor(private addItemsService: AddItemsService, private mainService: MainService) {

  }
  removeCategory(categoryId: number) {
    this.addItemsService.deleteCategory(categoryId)
      .subscribe({
        next: response => {
          console.log(response);

        },
        error: error => {
          if (this.mainService.checkIfUnauthenticatedAndRedirectIfSo(error)) return;
          console.log(error);
        }
      })
  }
}
