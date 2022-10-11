import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { apiModel } from '../../../models/api.model';

@Component({
  selector: 'app-recipe-tile',
  templateUrl: './recipe-tile.component.html',
  styleUrls: ['./recipe-tile.component.scss'],
})
export class RecipeTileComponent implements OnInit {
  @Input() recipe!: apiModel.recipe;
  @Output() recipeSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  selectRecipe(): void {
    this.recipeSelected.emit(this.recipe._id);
  }
}
