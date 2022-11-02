import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { takeUntil } from 'rxjs';
import { AbstractRecipeComponent } from 'src/app/shared/abstract-recipe.component';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeFormComponent
  extends AbstractRecipeComponent
  implements OnInit
{
  form!: FormGroup;
  maxNameLength: number = 80;
  maxDescriptionLength: number = 255;

  constructor(private _fb: FormBuilder, private _cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.recipeData$?.pipe(takeUntil(this.destroy$)).subscribe({
      next: (recipe) => {
        this.recipeData = recipe;
        if (this.recipeData) {
          this.editMode = true;
        } else {
          this.editMode = false;
        }
        this._initForm();
        this._patchForm();
      },
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.getRawValue();
      if (this.editMode && this.recipeData) {
        this._recipeFacade.updateRecipe({
          ...formData,
          _id: this.recipeData._id,
        });
      } else {
        this._recipeFacade.addRecipe(formData);
      }
    }
  }

  addIngredient(): void {
    this.getFormArray('ingredients').push(
      this._fb.group({
        name: [
          null,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(80),
          ],
        ],
        quantity: [null, [Validators.required, Validators.min(1)]],
      })
    );
  }

  removeIngredient(index: number): void {
    this.getFormArray('ingredients').removeAt(index);
  }

  getFormArray(arrayName: string): FormArray {
    return this.form.get(arrayName) as FormArray;
  }

  private _initForm(): void {
    this.form = this._fb.group({
      name: [
        this.editMode ? this.recipeData?.name : null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(this.maxNameLength),
        ],
      ],
      preparationTimeInMinutes: [
        this.editMode ? this.recipeData?.preparationTimeInMinutes : null,
        [Validators.required, Validators.min(1)],
      ],
      description: [
        this.editMode ? this.recipeData?.description : null,
        [
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(this.maxDescriptionLength),
        ],
      ],
      ingredients: new FormArray(
        [],
        [Validators.minLength(2), Validators.required]
      ),
    });
  }

  private _patchForm(): void {
    if (this.recipeData && this.editMode) {
      this.recipeData.ingredients.forEach(() => {
        this.addIngredient();
      });

      this.form.patchValue({
        name: this.recipeData.name,
        preparationTimeInMinutes: this.recipeData.preparationTimeInMinutes,
        description: this.recipeData.description,
        ingredients: this.recipeData.ingredients,
      });
      this._cdr.detectChanges();
    }
  }

  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  getIngredientControl(position: number, name: string): FormControl {
    return this.getFormArray('ingredients')
      .at(position)
      .get(name) as FormControl;
  }
}
