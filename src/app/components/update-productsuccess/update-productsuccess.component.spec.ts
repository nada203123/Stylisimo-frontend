import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductsuccessComponent } from './update-productsuccess.component';

describe('UpdateProductsuccessComponent', () => {
  let component: UpdateProductsuccessComponent;
  let fixture: ComponentFixture<UpdateProductsuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProductsuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateProductsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
