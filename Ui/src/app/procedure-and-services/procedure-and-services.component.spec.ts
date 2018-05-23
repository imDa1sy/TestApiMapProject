import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureAndServicesComponent } from './procedure-and-services.component';

describe('ProcedureAndServicesComponent', () => {
  let component: ProcedureAndServicesComponent;
  let fixture: ComponentFixture<ProcedureAndServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureAndServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureAndServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
