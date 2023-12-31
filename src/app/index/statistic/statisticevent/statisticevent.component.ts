import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ObjectInterface} from "../../../interfaces/ObjectsInterface";
import {totalEventsNumberForAllEvents, totalValueForAllEvents} from "../../../store/data";

@Component({
  selector: 'app-statisticevent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statisticevent.component.html',
  styleUrl: './statisticevent.component.css'
})
export class StatisticeventComponent implements OnInit{
  @Input() uniqNameListforDay: string[] = [];
  @Input() objectListForDay: ObjectInterface[] = [];
  @Input() fullObjectList: ObjectInterface[] = [];
  @Input() uniqName: string = '';
  newFilterListByName: ObjectInterface[] = [];
  totalValueFullList: number = 0;
  totalEventsNumberFullList: number = 0;
  pastelColors: string[] = [
    '#FFD1DC', // Light Pink
    '#FFECB3', // Light Yellow
    '#B2DFDB', // Light Teal
    '#E1BEE7', // Light Purple
    '#C8E6C9', // Light Green
    '#FFCCBC', // Light Peach
    '#B3E0FF', // Light Blue
    '#F0F4C3', // Light Lime
    '#D7CCC8', // Light Brown
    '#FFD180', // Light Orange
  ];
  pastelColorsStrong: string[] = [
    '#FF9AA2', // Pastel Red
    '#FFD700', // Pastel Yellow
    '#00CED1', // Dark Pastel Blue
    '#DDA0DD', // Pastel Purple
    '#98FB98', // Pastel Green
    '#FFB6C1', // Pastel Pink
    '#87CEEB', // Pastel Sky Blue
    '#FFD700', // Pastel Gold
    '#D2B48C', // Tan
    '#FFA07A', // Light Salmon
  ];

  ngOnInit() {
    this.totalValueFullList = this.getTotalValueForAllEventsInFullListWithThatName();
    this.totalEventsNumberFullList = this.getTotalEventsNumberInFullList();

  }

  getNumberOfEventsForDay(name: string) {
    this.newFilterListByName = this.objectListForDay.filter((object: ObjectInterface) => object.object_name === name);
    return this.newFilterListByName.length;
  }
  getTotalValueForDay(name: string) {
    this.newFilterListByName = this.objectListForDay.filter((object: ObjectInterface) => object.object_name === name);
    let totalValue = 0;
    this.newFilterListByName.forEach((object: ObjectInterface) => totalValue += object.value);

    return totalValue ;
  }

  getTotalValueForAllEvents() {
    return this.objectListForDay.reduce((totalValue: number , object: ObjectInterface)=> totalValue + object.value, 0);

  }

  getTotalValueForAllEventsInFullListWithThatName() {

  // const value = this.fullObjectList.reduce((totalValue: number , object: ObjectInterface)=> totalValue + object.value, 0);
    const value = this.fullObjectList.filter((object: ObjectInterface) => object.object_name === this.uniqName).reduce((totalValue: number , object: ObjectInterface)=> totalValue + object.value, 0);

    return value;
  }
  getTotalEventsNumberInFullList() {
   const event =  this.fullObjectList.filter((object: ObjectInterface) => object.object_name === this.uniqName).length;

       return event;
  }



}
