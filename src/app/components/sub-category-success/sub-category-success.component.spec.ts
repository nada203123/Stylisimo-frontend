import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategorySuccessComponent } from './sub-category-success.component';

describe('SubCategorySuccessComponent', () => {
  let component: SubCategorySuccessComponent;
  let fixture: ComponentFixture<SubCategorySuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubCategorySuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubCategorySuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
