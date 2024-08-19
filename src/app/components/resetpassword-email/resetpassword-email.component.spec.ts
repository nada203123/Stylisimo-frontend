import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpasswordEmailComponent } from './resetpassword-email.component';

describe('ResetpasswordEmailComponent', () => {
  let component: ResetpasswordEmailComponent;
  let fixture: ComponentFixture<ResetpasswordEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetpasswordEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResetpasswordEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
