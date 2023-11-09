import {Component, OnInit} from '@angular/core';
import {categoryList} from "../../store/data";
import {AddItemsService} from "../../service/add-items.service";
import {ObjectInterface, RootObjectInterface} from "../../interfaces/ObjectsInterface";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit{

  selectedObject: string = '';
  categoryId: any;
  newObjectsList: ObjectInterface[] = [];
  constructor(private addItemsService: AddItemsService) {

  }

  ngOnInit(): void {
    this.selectedObject = categoryList()[0].category_name;
this.showHistory(1);
    }


  protected readonly categoryList = categoryList;

  showHistory(categoryId: number ) {
    this.addItemsService.getObjectsList(categoryId)
      .subscribe({
        next: (response:RootObjectInterface)  => {
          console.log(response);
          this.newObjectsList = response.objects;
        },
        error: error => {
          console.log(error);
        }
      });
  }
}
