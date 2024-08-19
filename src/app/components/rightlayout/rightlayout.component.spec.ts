import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightlayoutComponent } from './rightlayout.component';

describe('RightlayoutComponent', () => {
  let component: RightlayoutComponent;
  let fixture: ComponentFixture<RightlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightlayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RightlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
