import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WasteDataEntryComponent } from './WasteDataEntry.component';


describe('WasteDataEntryComponent', () => {
  let component: WasteDataEntryComponent;
  let fixture: ComponentFixture<WasteDataEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WasteDataEntryComponent ]
    })
    .compileComponents();
  })); 

  beforeEach(() => {
    fixture = TestBed.createComponent(WasteDataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
