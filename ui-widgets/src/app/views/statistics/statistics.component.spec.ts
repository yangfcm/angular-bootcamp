import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StatisticsComponent } from './statistics.component';
import { statsData } from '../views-home/views-home.component';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;
  let statValues: DebugElement[], statLabels: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    component.data = statsData;
    fixture.detectChanges();
    statValues = fixture.debugElement.queryAll(By.css('.statistic .value'));
    statLabels = fixture.debugElement.queryAll(By.css('.statistic .label'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct statistics values and labels', () => {
    expect(statValues.length).toBe(statsData.length);
    expect(statLabels.length).toBe(statsData.length);
    for (let i = 0; i < statsData.length; i++) {
      expect(statValues[i].nativeElement.innerText).toContain(
        statsData[i].value
      );
      expect(statLabels[i].nativeElement.innerText).toContain(
        statsData[i].label.toUpperCase()
      );
    }
  });
});
