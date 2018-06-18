import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListWasteDataComponent } from './ListWasteData.component';


describe('ListWasteDataComponent', () => {
  let component: ListWasteDataComponent;
  let fixture: ComponentFixture<ListWasteDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListWasteDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWasteDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
