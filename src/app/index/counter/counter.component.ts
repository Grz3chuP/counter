import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {

  testArray: string[] = ['piniadz', 'kasa', 'hajs', 'szmal', 'forsa', 'kaska', 'kasiorka', 'kasiunia', 'kasiuńcia'];
  eventValue: number = 0;
  eventName: string = '';
  category: string = '';
  constructor() {
    this.category = this.testArray[Math.floor(Math.random() * this.testArray.length)];

  }
}
