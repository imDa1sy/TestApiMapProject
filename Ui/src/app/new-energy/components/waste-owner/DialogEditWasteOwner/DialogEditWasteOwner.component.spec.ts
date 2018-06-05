import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogEditWasteOwnerComponent } from './DialogEditWasteOwner.component';

describe('DialogEditWasteOwnerComponent', () => {
  let component: DialogEditWasteOwnerComponent;
  let fixture: ComponentFixture<DialogEditWasteOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditWasteOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditWasteOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
