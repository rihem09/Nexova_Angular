import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceEditDialogComponent } from './insurance-edit-dialog.component';

describe('InsuranceEditDialogComponent', () => {
  let component: InsuranceEditDialogComponent;
  let fixture: ComponentFixture<InsuranceEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsuranceEditDialogComponent]
    });
    fixture = TestBed.createComponent(InsuranceEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
