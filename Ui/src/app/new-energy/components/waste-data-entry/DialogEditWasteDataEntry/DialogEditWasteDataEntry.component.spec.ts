import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogEditWasteDataEntry } from './DialogEditWasteDataEntry.component';



describe('DialogEditWasteDataEntry', () => {
  let component: DialogEditWasteDataEntry;
  let fixture: ComponentFixture<DialogEditWasteDataEntry>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditWasteDataEntry ]
    })
    .compileComponents();
  })); 

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditWasteDataEntry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
