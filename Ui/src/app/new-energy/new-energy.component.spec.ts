import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEnergyComponent } from './new-energy.component';

describe('NewEnergyComponent', () => {
  let component: NewEnergyComponent;
  let fixture: ComponentFixture<NewEnergyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEnergyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEnergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
