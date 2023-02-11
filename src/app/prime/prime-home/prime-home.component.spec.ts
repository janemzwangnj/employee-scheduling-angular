import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeHomeComponent } from './prime-home.component';

describe('PrimeHomeComponent', () => {
  let component: PrimeHomeComponent;
  let fixture: ComponentFixture<PrimeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimeHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
