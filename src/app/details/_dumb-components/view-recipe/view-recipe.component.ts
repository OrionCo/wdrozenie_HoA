import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { apiModel } from '../../../../models/api.model';
import { RecipeService } from '../../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { AbstractRecipeComponent } from 'src/app/shared/abstract-recipe.component';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewRecipeComponent extends AbstractRecipeComponent {
  constructor(_recipeService: RecipeService, _route: ActivatedRoute) {
    super(_recipeService, _route);
  }
}
