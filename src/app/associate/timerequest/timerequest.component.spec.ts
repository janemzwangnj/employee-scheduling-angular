import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerequestComponent } from './timerequest.component';

describe('TimerequestComponent', () => {
  let component: TimerequestComponent;
  let fixture: ComponentFixture<TimerequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimerequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
