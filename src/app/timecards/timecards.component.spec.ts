import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimecardsComponent } from './timecards.component';

describe('TimecardsComponent', () => {
  let component: TimecardsComponent;
  let fixture: ComponentFixture<TimecardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimecardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimecardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
