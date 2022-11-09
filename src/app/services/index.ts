import { RootFacade } from '../store/facades/root.facade';
import { DialogService } from './dialog.service';
import { RecipeGuard } from './recipe.guard';
import { RecipeService } from './recipe.service';
import { SnackbarService } from './snackbar.service';
import { UnsavedGuard } from './unsaved.guard';

export const APP_SERVICES: any[] = [
  RecipeService,
  SnackbarService,
  RecipeGuard,
  UnsavedGuard,
  DialogService,
  RootFacade,
];
