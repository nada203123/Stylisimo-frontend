import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubCategorySuccessComponent } from './update-sub-category-success.component';

describe('UpdateSubCategorySuccessComponent', () => {
  let component: UpdateSubCategorySuccessComponent;
  let fixture: ComponentFixture<UpdateSubCategorySuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSubCategorySuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateSubCategorySuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
