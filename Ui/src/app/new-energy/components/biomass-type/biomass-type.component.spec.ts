import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiomassTypeComponent } from './biomass-type.component';

describe('BiomassTypeComponent', () => {
  let component: BiomassTypeComponent;
  let fixture: ComponentFixture<BiomassTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiomassTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiomassTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
