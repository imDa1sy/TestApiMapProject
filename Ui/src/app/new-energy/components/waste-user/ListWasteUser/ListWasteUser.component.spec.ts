import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListWasteUserComponent } from './ListWasteUser.component';

describe('ListWasteUserComponent', () => {
  let component: ListWasteUserComponent;
  let fixture: ComponentFixture<ListWasteUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListWasteUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWasteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
