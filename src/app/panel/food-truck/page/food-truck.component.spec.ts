import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodTruckComponent } from './food-truck.component';

describe('FoodTruckComponent', () => {
  let component: FoodTruckComponent;
  let fixture: ComponentFixture<FoodTruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodTruckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
