import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAssociateHomeComponent } from './hr-associate-home.component';

describe('HrAssociateHomeComponent', () => {
  let component: HrAssociateHomeComponent;
  let fixture: ComponentFixture<HrAssociateHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrAssociateHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrAssociateHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
