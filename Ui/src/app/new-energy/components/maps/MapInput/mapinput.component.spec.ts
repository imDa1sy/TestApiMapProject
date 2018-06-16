import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapinputComponent } from './mapinput.component';

describe('MapinputComponent', () => {
  let component: MapinputComponent;
  let fixture: ComponentFixture<MapinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
