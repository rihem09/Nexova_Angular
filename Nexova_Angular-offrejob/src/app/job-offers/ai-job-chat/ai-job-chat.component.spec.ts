import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiJobChatComponent } from './ai-job-chat.component';

describe('AiJobChatComponent', () => {
  let component: AiJobChatComponent;
  let fixture: ComponentFixture<AiJobChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AiJobChatComponent]
    });
    fixture = TestBed.createComponent(AiJobChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
