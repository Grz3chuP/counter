import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticdayComponent } from './statisticday.component';

describe('StatisticdayComponent', () => {
  let component: StatisticdayComponent;
  let fixture: ComponentFixture<StatisticdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticdayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
