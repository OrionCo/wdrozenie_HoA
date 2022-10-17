import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateRecipeComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private _recipeService: RecipeService,
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      name: [],
      preparationTimeInMinutes: [],
      description: [],
      ingredients: new FormArray([]),
    });
  }

  createRecipe(): void {
    if (this.form.valid) {
      const formData = this.form.getRawValue();
      this._recipeService.createRecipe(formData);
      this._cdr.detectChanges();
    }
  }

  addIngredient(): void {
    this.getFormArray('ingredients').push(
      this._fb.group({
        name: [],
        quantity: [],
      })
    );
  }

  removeIngredient(index: number): void {
    this.getFormArray('ingredients').removeAt(index);
  }

  getFormArray(arrayName: string): FormArray {
    return this.form.get(arrayName) as FormArray;
  }
}
