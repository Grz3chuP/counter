import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';


@Component({
  selector: 'app-weekhistory',
  templateUrl: './weekhistory.component.html',
  styleUrls: ['./weekhistory.component.css']
})
export class WeekhistoryComponent implements OnInit{
  week: number = 0;
  currentWeek: boolean = false;
  @Input() actualEndOfWeek: string = '';
  @Input() startOfWeek: string = '';
  thisWeekStart: string = '';
  thisWeekEnd: string = '';
  @Input() weekTotal: number = 0;
  @Input() weekTotalEvents: number = 0;
  @Output() changeWeekToParent = new EventEmitter<number>();

  ngOnInit(): void {
    this.thisWeekStart = this.startOfWeek;
    this.thisWeekEnd = this.actualEndOfWeek;
  }
  changeWeek() {
    this.week += 1;
    this.changeWeekToParent.emit(this.week);
    this.currentWeek = false;
  }
  changeWeekBack() {
    if (this.week === 0) {
    this.currentWeek = true;
    setTimeout(() => {
      this.currentWeek = false;
    },500);
      return;
    }
    this.week -= 1;
    this.changeWeekToParent.emit(this.week);
  }

  changeToCurrentWeek() {
    if (this.week === 0) {
      return;
    }
    this.week = 0;
    this.changeWeekToParent.emit(this.week);
  }
}
