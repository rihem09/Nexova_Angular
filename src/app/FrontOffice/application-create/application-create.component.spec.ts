import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCreateComponent } from './application-create.component';

describe('ApplicationCreateComponent', () => {
  let component: ApplicationCreateComponent;
  let fixture: ComponentFixture<ApplicationCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationCreateComponent]
    });
    fixture = TestBed.createComponent(ApplicationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
