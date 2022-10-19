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
import { Router } from '@angular/router';
import { finalize, first, takeUntil } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AbstractRecipeComponent } from 'src/app/shared/abstract-recipe.component';
import { Recipe } from 'src/models/api.model';

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

  constructor(
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _router: Router,
    private _snackBar: SnackbarService
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.recipeData$?.pipe(takeUntil(this.destroy$)).subscribe({
      next: (recipe) => {
        this.recipeData = recipe;
        this._initForm();
        this._patchForm();
      },
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.getRawValue();
      if (this.editMode && this.recipeData) {
        this._recipeService
          .updateRecipe(formData, this.recipeData._id)
          .pipe(
            first(),
            finalize(() =>
              this._recipeService
                .getRecipes()
                .pipe(first())
                .subscribe({
                  error: (err) => {
                    console.warn(err);
                    this._snackBar.open('Failed to fetch recipes.', false);
                  },
                })
            )
          )
          .subscribe({
            next: () => {
              this._snackBar.open('Successfully edited recipe.');
              this._router.navigate([`recipe/${this.recipeData?._id}`]);
            },
            error: () => {
              this._snackBar.open('Failed to edit recipe.', false);
            },
          });
      } else {
        this._recipeService
          .createRecipe(formData)
          .pipe(
            first(),
            finalize(() =>
              this._recipeService
                .getRecipes()
                .pipe(first())
                .subscribe({
                  error: (err) => {
                    console.warn(err);
                    this._snackBar.open('Failed to fetch recipes.', false);
                  },
                })
            )
          )
          .subscribe({
            next: (res: Recipe) => {
              this._snackBar.open('Successfully created recipe.');
              this._router.navigate([`recipe/${res?._id}`]);
            },
            error: (err) => {
              console.warn(err);
              this._snackBar.open('Failed to create recipe.', false);
            },
          });
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
