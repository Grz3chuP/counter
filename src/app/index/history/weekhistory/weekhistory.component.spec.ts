import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekhistoryComponent } from './weekhistory.component';

describe('WeekhistoryComponent', () => {
  let component: WeekhistoryComponent;
  let fixture: ComponentFixture<WeekhistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeekhistoryComponent]
    });
    fixture = TestBed.createComponent(WeekhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
