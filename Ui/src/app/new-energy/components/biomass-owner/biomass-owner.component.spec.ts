import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiomassOwnerComponent } from './biomass-owner.component';

describe('BiomassOwnerComponent', () => {
  let component: BiomassOwnerComponent;
  let fixture: ComponentFixture<BiomassOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiomassOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiomassOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
