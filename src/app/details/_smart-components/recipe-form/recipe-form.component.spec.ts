import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeFormComponent } from './recipe-form.component';

describe('CreateRecipeComponent', () => {
  let component: RecipeFormComponent;
  let fixture: ComponentFixture<RecipeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
