import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifytimecardComponent } from './modifytimecard.component';

describe('ModifytimecardComponent', () => {
  let component: ModifytimecardComponent;
  let fixture: ComponentFixture<ModifytimecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifytimecardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifytimecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
