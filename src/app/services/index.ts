import { RootFacade } from '../store/facades/root.facade';
import { RecipeGuard } from './recipe.guard';
import { RecipeService } from './recipe.service';
import { SnackbarService } from './snackbar.service';

export const APP_SERVICES: any[] = [
  RecipeService,
  SnackbarService,
  RecipeGuard,
  RootFacade,
];
