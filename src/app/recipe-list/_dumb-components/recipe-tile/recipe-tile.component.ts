import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/models/api.model';

@Component({
  selector: 'app-recipe-tile',
  templateUrl: './recipe-tile.component.html',
  styleUrls: ['./recipe-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeTileComponent {
  @Input() recipe!: Recipe;
  @Output() recipeSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() recipeDeleted: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _router: Router) {}

  selectRecipe(): void {
    this.recipeSelected.emit(this.recipe._id);
  }

  deleteRecipe(event: Event): void {
    this.recipeDeleted.emit(this.recipe._id);
    event.stopPropagation();
  }

  editRecipe(event: Event): void {
    this._router.navigate(['/recipe/edit', this.recipe._id]);
    event.stopPropagation();
  }
}
