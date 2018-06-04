import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListWasteTypeComponent } from './ListWasteType.component';

describe('ListWasteType', () => {
  let component: ListWasteTypeComponent;
  let fixture: ComponentFixture<ListWasteTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListWasteTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWasteTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
