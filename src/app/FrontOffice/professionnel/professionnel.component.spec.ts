import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionnelComponent } from './professionnel.component';

describe('ProfessionnelComponent', () => {
  let component: ProfessionnelComponent;
  let fixture: ComponentFixture<ProfessionnelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessionnelComponent]
    });
    fixture = TestBed.createComponent(ProfessionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
