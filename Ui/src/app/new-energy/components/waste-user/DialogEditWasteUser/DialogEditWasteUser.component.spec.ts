import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogEditWasteUserComponent } from './DialogEditWasteUser.component';

describe('DialogEditWasteUserComponent', () => {
  let component: DialogEditWasteUserComponent;
  let fixture: ComponentFixture<DialogEditWasteUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditWasteUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditWasteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
