import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddedSuccessComponent } from './product-added-success.component';

describe('ProductAddedSuccessComponent', () => {
  let component: ProductAddedSuccessComponent;
  let fixture: ComponentFixture<ProductAddedSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAddedSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductAddedSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
