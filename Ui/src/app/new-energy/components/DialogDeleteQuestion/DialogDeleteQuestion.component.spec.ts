import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogDeleteQuestionComponent } from './DialogDeleteQuestion.component';


describe('DialogDeleteQuestionComponent', () => {
  let component: DialogDeleteQuestionComponent;
  let fixture: ComponentFixture<DialogDeleteQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDeleteQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
