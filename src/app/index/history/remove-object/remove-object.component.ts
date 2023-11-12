import {Component, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddItemsService} from "../../../service/add-items.service";
import {MainService} from "../../../main.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-remove-object',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './remove-object.component.html',
  styleUrl: './remove-object.component.css'
})
export class RemoveObjectComponent {
@Input() objectId: number = 0;
@Input() removingAnimation: boolean = false;
@Output() objectIdOutput = new EventEmitter<number>();
@Output() newObjectValueOutput = new EventEmitter<{id: number, value: number}>();
newObjectValue: number = 0;
  constructor(private addItemsService: AddItemsService, private mainService: MainService) {

  }

  removeObjectFromDatabase(objectId: number) {
    this.addItemsService.removeObject(objectId)
      .pipe()
      .subscribe({
        next: response => {
          console.log(response);
          this.objectIdOutput.emit(objectId)
          alert('Usunięto obiekt')
        },
        error: error => {
          if (this.mainService.checkIfUnauthenticatedAndRedirectIfSo(error)) return;
          console.log(error);
        }
      })
  }
  changeObjectValue(objectId: number) {

    this.addItemsService.changeObjectValue(objectId, this.newObjectValue )
      .pipe()
      .subscribe({
        next: response => {
          console.log(response);
          this.newObjectValueOutput.emit({id: objectId, value: this.newObjectValue});
          alert('Zmieniono wartość obiektu')
        },
        error: error => {
          if (this.mainService.checkIfUnauthenticatedAndRedirectIfSo(error)) return;
          console.log(error);
        }
      })
  }
}
