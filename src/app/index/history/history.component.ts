import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  testArray: string[] = ['piniadz', 'kasa', 'hajs', 'szmal', 'forsa', 'kaska', 'kasiorka', 'kasiunia', 'kasiuńcia'];
  selectedObject: string = '';
  constructor() {
    this.selectedObject = this.testArray[Math.floor(Math.random() * this.testArray.length)];
  }
}
