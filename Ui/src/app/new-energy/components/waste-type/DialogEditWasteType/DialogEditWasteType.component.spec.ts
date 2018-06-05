import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogEditWasteTypeComponent } from './DialogEditWasteType.component';

describe('DialogEditWasteTypeComponent', () => {
  let component: DialogEditWasteTypeComponent;
  let fixture: ComponentFixture<DialogEditWasteTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditWasteTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditWasteTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
