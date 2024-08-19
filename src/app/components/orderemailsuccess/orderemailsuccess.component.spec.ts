import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderemailsuccessComponent } from './orderemailsuccess.component';

describe('OrderemailsuccessComponent', () => {
  let component: OrderemailsuccessComponent;
  let fixture: ComponentFixture<OrderemailsuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderemailsuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderemailsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
