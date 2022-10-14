import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { RecipeService } from '../../../services/recipe.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, first, takeUntil } from 'rxjs';
import { AbstractRecipeComponent } from 'src/app/shared/abstract-recipe.component';
import { Recipe } from 'src/models/api.model';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeFormComponent extends AbstractRecipeComponent {
  form!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _router: Router,
    _recipeService: RecipeService,
    _route: ActivatedRoute
  ) {
    super(_recipeService, _route);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.recipeData$?.pipe(takeUntil(this.destroy$)).subscribe((recipe) => {
      this.recipeData = recipe;
      this._initForm();
      this._patchForm();
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
              this._recipeService.getRecipes().pipe(first()).subscribe()
            )
          )
          .subscribe({
            next: () => {
              this._router.navigate([`recipe/${this.recipeData?._id}`]);
            },
          });
      } else {
        this._recipeService
          .createRecipe(formData)
          .pipe(
            first(),
            finalize(() =>
              this._recipeService.getRecipes().pipe(first()).subscribe()
            )
          )
          .subscribe({
            next: (res: Recipe) => {
              this._router.navigate([`recipe/${res?._id}`]);
            },
          });
      }
    }
  }

  addIngredient(): void {
    this.getFormArray('ingredients').push(
      this._fb.group({
        name: [null, Validators.required],
        quantity: [null, Validators.required],
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
          Validators.maxLength(80),
        ],
      ],
      preparationTimeInMinutes: [
        this.editMode ? this.recipeData?.preparationTimeInMinutes : null,
        Validators.required,
      ],
      description: [
        this.editMode ? this.recipeData?.description : null,
        [
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(255),
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
}
