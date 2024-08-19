import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyAccountFailedComponent } from './verify-account-failed.component';

describe('VerifyAccountFailedComponent', () => {
  let component: VerifyAccountFailedComponent;
  let fixture: ComponentFixture<VerifyAccountFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyAccountFailedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifyAccountFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
